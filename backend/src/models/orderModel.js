const db = require('../config/db');

const Order = {
  create: async (userId, totalAmount, items) => {
    try {
      // 1. Insert into orders table
      const orderQuery = `
        INSERT INTO orders (user_id, total_amount)
        VALUES ($1, $2)
        RETURNING order_id, user_id, total_amount, status, created_at;
      `;
      const orderResult = await db.query(orderQuery, [userId, totalAmount]);
      const order = orderResult.rows[0];

      // 2. Insert each item into order_items table
      for (let item of items) {
        const itemQuery = `
          INSERT INTO order_items (order_id, product_id, quantity, price)
          VALUES ($1, $2, $3, $4);
        `;
        await db.query(itemQuery, [order.order_id, item.product_id, item.quantity, item.price]);
      }

      return order;
    } catch (err) {
      throw err;
    }
  },

  findByUserId: async (userId) => {
    const query = `
      SELECT o.order_id, o.total_amount, o.status, o.created_at,
             json_agg(json_build_object(
               'product_id', p.product_id, 
               'title', p.title, 
               'image_url', p.image_url,
               'quantity', oi.quantity, 
               'price', oi.price
             )) as items
      FROM orders o
      JOIN order_items oi ON o.order_id = oi.order_id
      JOIN products p ON oi.product_id = p.product_id
      WHERE o.user_id = $1
      GROUP BY o.order_id
      ORDER BY o.created_at DESC;
    `;
    const result = await db.query(query, [userId]);
    return result.rows;
  }
};

module.exports = Order;