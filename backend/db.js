const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('connected');
  } catch (error) {
    console.log('not connected :' + error);
  }
}

module.exports = connectDB;
