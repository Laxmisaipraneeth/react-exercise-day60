const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Toys', 'Beauty', 'Food'];

const generateProducts = () => {
  const products = [];
  for (let i = 1; i <= 100; i++) {
    products.push({
      name: `Product ${i}`,
      price: Math.floor(Math.random() * 1000) + 10,
      category: categories[Math.floor(Math.random() * categories.length)],
      inStock: Math.random() > 0.2
    });
  }
  return products;
};

const seedDatabase = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/products-catalog?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.1');
    
    // Clear existing products
    await Product.deleteMany({});
    
    // Insert new products
    const products = generateProducts();
    await Product.insertMany(products);
    
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 