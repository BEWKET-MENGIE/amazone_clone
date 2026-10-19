const db = require('../config/db');

const Product = {
  getAll: async () => {
    const result = await db.query('SELECT * FROM products');
    return result.rows;
  },
};

module.exports = Product;