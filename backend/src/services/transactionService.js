const TransactionModel = require('../models/Transactions');

exports.getFilteredTransactions = async (query) => {
  await TransactionModel.importPromise; // Ensure DB is ready

  let sql = 'SELECT * FROM transactions';
  const whereClauses = [];
  const params = {};

  // 1. Search (OR logic across fields)
  if (query.q) {
    const term = `%${query.q.trim()}%`;
    whereClauses.push(`(
      customer_name LIKE @q OR 
      phone_number LIKE @q OR 
      product_name LIKE @q OR 
      brand LIKE @q
    )`);
    params.q = term;
  }

  // 2. Exact Match Filters (Multi-select via comma)
  const exactFilters = {
    region: 'region',
    category: 'product_category',
    paymentMethod: 'payment_method',
    status: 'status',
    gender: 'gender',
    brand: 'brand',
    storeLocation: 'store_location',
    customerType: 'customer_type',
    deliveryType: 'delivery_type'
  };

  Object.entries(exactFilters).forEach(([queryKey, dbColumn]) => {
    if (query[queryKey]) {
      const values = query[queryKey].split(',').map(v => v.trim());
      // Create placeholders like @region0, @region1
      const placeholders = values.map((_, i) => `@${queryKey}${i}`).join(',');
      whereClauses.push(`${dbColumn} IN (${placeholders})`);
      values.forEach((v, i) => params[`${queryKey}${i}`] = v);
    }
  });

  // 3. Tags Filter (LIKE %tag%)
  if (query.tags) {
     // If multiple tags logic needed, typically intersection or union.
     // For simplicity, treating as single tag filter or multiple ORs
     // "tags" column in DB is "FastFashion,Summer".
     const tags = query.tags.split(',').map(t => t.trim());
     const tagClauses = tags.map((_, i) => `tags LIKE @tag${i}`).join(' OR ');
     whereClauses.push(`(${tagClauses})`);
     tags.forEach((t, i) => params[`tag${i}`] = `%${t}%`);
  }

  // 4. Range Filters
  if (query.startDate) {
    whereClauses.push('date >= @startDate');
    params.startDate = query.startDate;
  }
  if (query.endDate) {
    whereClauses.push('date <= @endDate');
    params.endDate = new Date(query.endDate).toISOString().split('T')[0] + 'T23:59:59.999Z'; 
  }
  if (query.minAge) {
    whereClauses.push('age >= @minAge');
    params.minAge = parseInt(query.minAge);
  }
  if (query.maxAge) {
    whereClauses.push('age <= @maxAge');
    params.maxAge = parseInt(query.maxAge);
  }

  // Combine Where Clauses
  if (whereClauses.length > 0) {
    sql += ' WHERE ' + whereClauses.join(' AND ');
  }

  // 5. Sorting
  const sortMap = {
    date: 'date',
    quantity: 'quantity',
    price: 'final_amount',
    customerName: 'customer_name'
  };
  const sortBy = sortMap[query.sortBy] || 'date';
  const sortOrder = query.sortOrder === 'asc' ? 'ASC' : 'DESC';
  sql += ` ORDER BY ${sortBy} ${sortOrder}`;

  // 6. Pagination
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const offset = (page - 1) * limit;

  // Get Total Count and Aggregates
  const statsSql = `
    SELECT 
      COUNT(*) as count,
      SUM(quantity) as totalQuantity,
      SUM(final_amount) as totalAmount,
      SUM( (price_per_unit * quantity) * (discount_percent / 100) ) as totalDiscount
    FROM transactions 
    ${whereClauses.length > 0 ? 'WHERE ' + whereClauses.join(' AND ') : ''}
  `;
  
  const statsResult = TransactionModel.get(statsSql, params);
  const total = statsResult ? statsResult.count : 0;
  const aggregates = {
    totalQuantity: statsResult ? statsResult.totalQuantity || 0 : 0,
    totalAmount: statsResult ? statsResult.totalAmount || 0 : 0,
    totalDiscount: statsResult ? statsResult.totalDiscount || 0 : 0
  };

  // Apply Limit/Offset
  sql += ' LIMIT @limit OFFSET @offset';
  params.limit = limit;
  params.offset = offset;

  // Execute
  const data = TransactionModel.query(sql, params);

  // Map result keys to camelCase
  const mappedData = data.map(row => ({
    id: row.id,
    date: row.date,
    customerName: row.customer_name,
    customerId: row.customer_id,
    phoneNumber: row.phone_number,
    gender: row.gender,
    age: row.age,
    region: row.region,
    customerType: row.customer_type,
    productName: row.product_name,
    productCategory: row.product_category,
    productId: row.product_id,
    brand: row.brand,
    tags: row.tags ? row.tags.split(',') : [],
    quantity: row.quantity,
    price: row.final_amount,
    finalAmount: row.final_amount,
    paymentMethod: row.payment_method,
    status: row.status,
    deliveryType: row.delivery_type,
    storeLocation: row.store_location,
    employeeName: row.employee_name
  }));

  return {
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      aggregates // Include stats in response
    },
    data: mappedData
  };
};

exports.getUniqueFilters = async () => {
  await TransactionModel.importPromise;
  return {
    regions: TransactionModel.getDistinct('region'),
    categories: TransactionModel.getDistinct('product_category'),
    paymentMethods: TransactionModel.getDistinct('payment_method'),
    genders: TransactionModel.getDistinct('gender'),
    statuses: TransactionModel.getDistinct('status'),
    brands: TransactionModel.getDistinct('brand'),
    storeLocations: TransactionModel.getDistinct('store_location'),
    customerTypes: TransactionModel.getDistinct('customer_type'),
    deliveryTypes: TransactionModel.getDistinct('delivery_type'),
    tags: TransactionModel.getDistinctTags()
  };
};
