import ENV from "./config/env.js";
import express from "express";

const app = express();

app.use("/api/candidatues");
app.use("/api/statistique");

export default app;
