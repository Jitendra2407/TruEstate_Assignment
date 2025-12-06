const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '../../data/sale_sphere.db');

// Ensure data directory exists
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(dbPath); // verbose: console.log

// Initialize Schema
const initSchema = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY,
      date TEXT,
      customer_id TEXT,
      customer_name TEXT,
      phone_number TEXT,
      gender TEXT,
      age INTEGER,
      region TEXT,
      customer_type TEXT,
      product_id TEXT,
      product_name TEXT,
      brand TEXT,
      product_category TEXT,
      tags TEXT,
      quantity INTEGER,
      price_per_unit REAL,
      discount_percent REAL,
      total_amount REAL,
      price REAL,
      final_amount REAL,
      payment_method TEXT,
      status TEXT,
      delivery_type TEXT,
      store_id TEXT,
      store_location TEXT,
      salesperson_id TEXT,
      employee_name TEXT
    );

    -- Indices for performant search and filtering
    CREATE INDEX IF NOT EXISTS idx_customer_name ON transactions(customer_name);
    CREATE INDEX IF NOT EXISTS idx_phone ON transactions(phone_number);
    CREATE INDEX IF NOT EXISTS idx_region ON transactions(region);
    CREATE INDEX IF NOT EXISTS idx_category ON transactions(product_category);
    CREATE INDEX IF NOT EXISTS idx_date ON transactions(date);
    CREATE INDEX IF NOT EXISTS idx_brand ON transactions(brand);
    CREATE INDEX IF NOT EXISTS idx_status ON transactions(status);
  `);
};

initSchema();

module.exports = db;
