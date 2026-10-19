const db = require('./db');

const seedProducts = async () => {
  try {
    const sampleProducts = [
      {
        title: 'Wireless Bluetooth Over-Ear Headphones',
        description: 'Active noise-cancelling headphones with deep bass, built-in microphone, and 40-hour battery life.',
        price: 79.99,
        category: 'Electronics',
        image_url: 'https://m.media-amazon.com/images/I/61CGHv6yuFL._AC_SL1500_.jpg',
        rating_rate: 4.5,
        rating_count: 120
      },
      {
        title: 'Smart Fitness Tracker & Watch',
        description: 'Tracks heart rate, sleep quality, daily steps, and features ATM water resistance with built-in GPS.',
        price: 49.99,
        category: 'Wearables',
        image_url: 'https://m.media-amazon.com/images/I/71X1uM7z9gL._AC_SL1500_.jpg',
        rating_rate: 4.2,
        rating_count: 85
      },
      {
        title: 'Ergonomic Mesh Office Chair',
        description: 'Adjustable high-back office desk chair with comfortable lumbar support and breathable mesh.',
        price: 129.99,
        category: 'Furniture',
        image_url: 'https://m.media-amazon.com/images/I/61k29l7isxL._AC_SL1500_.jpg',
        rating_rate: 4.7,
        rating_count: 310
      },
      {
        title: 'Mechanical Gaming Keyboard & Mouse Combo',
        description: 'RGB LED backlit mechanical keyboard with tactile switches and high-precision gaming mouse.',
        price: 59.99,
        category: 'Accessories',
        image_url: 'https://m.media-amazon.com/images/I/71jpv963e1L._AC_SL1500_.jpg',
        rating_rate: 4.6,
        rating_count: 215
      }
    ];

    for (let p of sampleProducts) {
      const query = `
        INSERT INTO products (title, description, price, category, image_url, rating_rate, rating_count)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `;
      await db.query(query, [p.title, p.description, p.price, p.category, p.image_url, p.rating_rate, p.rating_count]);
    }

    console.log('Sample products seeded successfully into PostgreSQL!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding products:', err);
    process.exit(1);
  }
};

seedProducts();