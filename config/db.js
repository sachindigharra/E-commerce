import mongoose from 'mongoose';

const connectdb = async () => {
    try {
        // Ensure MONGO_URL is defined in your environment variables
        if (!process.env.MONGO_URL) {
            throw new Error("MONGO_URL is not defined in the environment variables.");
        }

        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("DB Connected successfully");
    } catch (error) {
        console.error("Error in MongoDB connection:", error.message);
    }
};

export default connectdb;
