const fs = require('fs');
const path = require('path');

const regions = ['North America', 'Europe', 'Asia', 'South America', 'Africa'];
const paymentMethods = ['Credit Card', 'PayPal', 'Wire Transfer', 'Google Pay', 'Apple Pay'];
const categories = ['Electronics', 'Clothing', 'Home & Garden', 'Toys', 'Books', 'Sports'];
const statuses = ['Completed', 'Pending', 'Failed', 'Refunded'];

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomPhone() {
  return `+${Math.floor(Math.random() * 90) + 10} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 9000) + 1000}`;
}

const transactions = Array.from({ length: 150 }, (_, i) => {
  return {
    id: i + 1,
    customerName: `Customer ${i + 1}`,
    phoneNumber: randomPhone(),
    age: Math.floor(Math.random() * 60) + 18,
    gender: Math.random() > 0.5 ? 'Male' : 'Female',
    region: regions[Math.floor(Math.random() * regions.length)],
    productCategory: categories[Math.floor(Math.random() * categories.length)],
    paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
    quantity: Math.floor(Math.random() * 10) + 1,
    price: parseFloat((Math.random() * 500).toFixed(2)),
    date: randomDate(new Date(2023, 0, 1), new Date()).toISOString(),
    status: statuses[Math.floor(Math.random() * statuses.length)]
  };
});

const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)){
    fs.mkdirSync(dataDir);
}

fs.writeFileSync(path.join(dataDir, 'transactions.json'), JSON.stringify(transactions, null, 2));
console.log('Mock data generated with Phone Numbers');
