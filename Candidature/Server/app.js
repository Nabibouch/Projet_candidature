import ENV from "./config/env.js";
import express from "express";
import router from "./Router/routes.js";
import connectDB from "./config/db.js";

const app = express();
connectDB();

app.use(express.json());
app.use("/candidature", router);

export default app;
