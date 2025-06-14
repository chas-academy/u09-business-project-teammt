import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log('connected');
  } catch (error) {
    console.log('not connected :' + error);
  }
}

export default connectDB;
