const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(
      'mongodb+srv://dbUser:dbPassword786@u09-cookbook.koje8nx.mongodb.net/?retryWrites=true&w=majority&appName=u09-CookBook'
    );
    console.log('connected');
  } catch (error) {
    console.log('not connected :' + error);
  }
}

module.exports = connectDB;
