import mongoose from "mongoose";

export const connectDB= async():Promise<void>=>{
    try {
        const con =await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`MongoDB connected : ${ con.connection.host }`)

    } catch (error) {
        console.error("MongoDB connection failed : ",error);
        throw error;
    }
}