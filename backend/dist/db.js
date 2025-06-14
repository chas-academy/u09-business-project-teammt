import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('connected');
    }
    catch (error) {
        console.log('not connected :' + error);
    }
}
export default connectDB;
//# sourceMappingURL=db.js.map