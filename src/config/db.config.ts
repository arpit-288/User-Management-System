import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


const connection = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/');
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}

export default connection
