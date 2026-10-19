const db = require('../config/db');

const User = {
  create: async (username, email, passwordHash) => {
    const query = `
      INSERT INTO users (username, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING user_id, username, email, created_at;
    `;
    const values = [username, email, passwordHash];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  findByEmail: async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1;';
    const result = await db.query(query, [email]);
    return result.rows[0];
  }
};

module.exports = User;