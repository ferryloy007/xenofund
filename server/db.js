const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    await mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log('MongoDB connected successfully');
      })
      .catch((err) => {
        console.error('MongoDB connection error:', err);
      });
  } catch (e) {
    console.error('Error connecting to MongoDB:', e);
    process.exit(1);
  }
}
module.exports = connectToDatabase;
