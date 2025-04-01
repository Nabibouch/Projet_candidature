import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.URI_mongo);
        console.log("MongoDB est connecté");
    } catch (error) {
        console.error("Problème de connection", error);
        process.exit(1);
    }
}

export default connectDB