import ENV from "./config/env.js";
import express from "express";
import router from "./Router/routes.js";
import connectDB from "./config/db.js";
import cors from 'cors';


const app = express();
connectDB();

// MIDDLEWARES
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5174'],
}))

// PREFIX
app.use("/candidature", router);

export default app;
