import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const connectToDatabase = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB connection successfull');
    } catch (error) {
        console.error('Error trying to connect to MongoDB:', error.message);
        process.exit(1);
    }
};

export default connectToDatabase;
