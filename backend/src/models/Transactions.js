const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const db = require('../db');

class TransactionModel {
  constructor() {
    this.importPromise = this.ensureData();
  }

  async ensureData() {
    try {
      const count = db.prepare('SELECT COUNT(*) as count FROM transactions').get().count;
      if (count > 0) {
        console.log(`Database ready with ${count} records.`);
        return;
      }
      console.log('Database empty. Starting CSV import...');
      await this.importCsv();
    } catch (err) {
      console.error('Database check failed:', err);
    }
  }

  importCsv() {
    return new Promise((resolve, reject) => {
      const csvPath = path.join(__dirname, '../../../truestate_assignment_dataset.csv');
      const results = [];
      const BATCH_SIZE = 1000;
      
      const insert = db.prepare(`
        INSERT INTO transactions (
          id, date, customer_id, customer_name, phone_number, gender, age, region, 
          customer_type, product_id, product_name, brand, product_category, tags, 
          quantity, price_per_unit, discount_percent, total_amount, price, final_amount, 
          payment_method, status, delivery_type, store_id, store_location, salesperson_id, employee_name
        ) VALUES (
          @id, @date, @customerId, @customerName, @phoneNumber, @gender, @age, @region,
          @customerType, @productId, @productName, @brand, @productCategory, @tags,
          @quantity, @pricePerUnit, @discountPercent, @totalAmount, @price, @finalAmount,
          @paymentMethod, @status, @deliveryType, @storeId, @storeLocation, @salespersonId, @employeeName
        )
      `);

      const insertMany = db.transaction((rows) => {
        for (const row of rows) insert.run(row);
      });

      if (!fs.existsSync(csvPath)) {
        console.error('CSV not found at:', csvPath);
        resolve();
        return;
      }

      fs.createReadStream(csvPath)
        .pipe(csv())
        .on('data', (data) => {
            try {
                results.push({
                    id: parseInt(data['Transaction ID']) || 0,
                    date: new Date(data['Date']).toISOString(),
                    customerId: data['Customer ID'],
                    customerName: data['Customer Name'],
                    phoneNumber: data['Phone Number'],
                    gender: data['Gender'],
                    age: parseInt(data['Age']) || 0,
                    region: data['Customer Region'],
                    customerType: data['Customer Type'],
                    productId: data['Product ID'],
                    productName: data['Product Name'],
                    brand: data['Brand'],
                    productCategory: data['Product Category'],
                    tags: data['Tags'] || '', 
                    quantity: parseInt(data['Quantity']) || 0,
                    pricePerUnit: parseFloat(data['Price per Unit']) || 0,
                    discountPercent: parseFloat(data['Discount Percentage']) || 0,
                    totalAmount: parseFloat(data['Total Amount']) || 0,
                    price: parseFloat(data['Final Amount']) || 0, 
                    finalAmount: parseFloat(data['Final Amount']) || 0,
                    paymentMethod: data['Payment Method'],
                    status: data['Order Status'],
                    deliveryType: data['Delivery Type'],
                    storeId: data['Store ID'],
                    storeLocation: data['Store Location'],
                    salespersonId: data['Salesperson ID'],
                    employeeName: data['Employee Name']
                });

                if (results.length >= BATCH_SIZE) {
                    insertMany(results);
                    results.length = 0;
                }
            } catch (err) {
                // Ignore bad rows
            }
        })
        .on('end', () => {
            if (results.length > 0) insertMany(results);
            console.log('CSV Import Completed.');
            resolve();
        })
        .on('error', (err) => reject(err));
    });
  }

  query(sql, params = []) {
    return db.prepare(sql).all(params);
  }

  get(sql, params = []) {
    return db.prepare(sql).get(params);
  }

  getDistinct(column) {
    const rows = db.prepare(`SELECT DISTINCT ${column} FROM transactions WHERE ${column} IS NOT NULL AND ${column} != '' ORDER BY ${column}`).all();
    return rows.map(r => r[column]);
  }

  getDistinctTags() {
     const rows = db.prepare(`SELECT DISTINCT tags FROM transactions WHERE tags IS NOT NULL`).all();
     const tagSet = new Set();
     rows.forEach(r => {
        if(r.tags) r.tags.split(',').forEach(t => tagSet.add(t.trim()));
     });
     return [...tagSet].sort();
  }
}

module.exports = new TransactionModel();
