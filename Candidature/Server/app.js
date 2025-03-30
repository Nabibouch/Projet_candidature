import ENV from "./config/env.js";
import express from "express";
import router from "./Router/routes.js";
import connectDB from "./config/db.js";
import cors from 'cors';
import cookieParser from "cookie-parser";

const app = express();
connectDB();

// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(cors({
    origin: ['http://localhost:5173'],
}))


// PREFIX
app.use("/candidature", router);

export default app;
