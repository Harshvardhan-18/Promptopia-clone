import mongoose from "mongoose";

let isConnected=false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log("Using existing connection");
        return;
    }

    try {
        console.log("Connecting to database with URI:", process.env.MONGO_DB_URI);
        await mongoose.connect(process.env.MONGO_DB_URI, {
            dbName: "share_prompt",
        });
        isConnected = true;

        console.log("Connected to database");
    } catch (error) {
        console.error("Database connection error:", error);
    }
};