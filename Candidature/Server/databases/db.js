import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB)
        console.log("MongoDB est connecté");
    } catch (error) {
        console.error("Problème de connection", error);
        process.exit(1)
    }
}

export default connectDB