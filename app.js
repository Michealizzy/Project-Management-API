import express from "express";
import dashboardRoutes from "../PROJECT-MANAGEMENT-API/src/routes/dashboardRoutes.js"

const app = express();

app.use(express.json());

// Dashboard routes
app.use("/dashboard", dashboardRoutes);

export default app;