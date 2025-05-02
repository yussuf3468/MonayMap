const express = require("express");
const Expense = require("../models/Expense");
const protect = require("../middlewares/authMiddleware");
const Budget = require("../models/Budget");

const router = express.Router();

// Get all expenses for a user
router.get("/", protect, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user._id });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get expenses by category
router.get("/category/:categoryId", protect, async (req, res) => {
  try {
    const { categoryId } = req.params;
    const expenses = await Expense.find({
      userId: req.user._id,
      category: categoryId,
    });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get expenses by date range
router.get("/date", protect, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const expenses = await Expense.find({
      userId: req.user._id,
      date: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get expenses by category and date range
router.get("/category/:categoryId/date", protect, async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { startDate, endDate } = req.query;
    const expenses = await Expense.find({
      userId: req.user._id,
      category: categoryId,
      date: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get expenses by category and budget
router.get("/category/:categoryId/budget", protect, async (req, res) => {
  try {
    const { categoryId } = req.params;
    const budget = await Budget.findOne({
      userId: req.user._id,
      category: categoryId,
    });
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }
    const expenses = await Expense.find({
      userId: req.user._id,
      category: categoryId,
    });
    res.status(200).json({ budget, expenses });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Create a new expense
router.post("/", protect, async (req, res) => {
  try {
    const { amount, category, date, note, type } = req.body;
    const newExpense = new Expense({
      userId: req.user._id,
      amount,
      category,
      date,
      note,
      type,
    });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Update an expense
router.put("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, category, date, description } = req.body;
    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { amount, category, date, description },
      { new: true }
    );
    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Delete an expense
router.delete("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExpense = await Expense.findByIdAndDelete(id);
    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
// This code defines a set of routes for managing expenses in a Node.js application using Express. It includes routes for getting all expenses, filtering by category and date range, creating, updating, and deleting expenses. The routes are protected by an authentication middleware to ensure that only authenticated users can access them. The code also handles errors and returns appropriate responses to the client.
// The routes interact with a MongoDB database using Mongoose models for expenses and budgets. The code is structured to follow RESTful principles, making it easy to understand and maintain. Each route is defined with its corresponding HTTP method (GET, POST, PUT, DELETE) and includes error handling to manage potential issues during database operations.
