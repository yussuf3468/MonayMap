require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
// const categoryRoutes = require("./routes/categoryRoutes");
// const budgetRoutes = require("./routes/budgetRoutes");
const { errorHandler } = require("./middlewares/errorMiddleware");
connectDB(); // Connect to the database

const app = express(); // Initialize Express app

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors()); // Enable CORS

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
// app.use("/api/categories", categoryRoutes);
// app.use("/api/budgets", budgetRoutes);

// Error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));