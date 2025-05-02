const mongoose = require('mongoose');
const { Schema } = mongoose;
const ExpenseSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
  },
  note: {
    type: String,
  },
});

const Expense = mongoose.model('Expense', ExpenseSchema);
module.exports = Expense;

// This code defines a Mongoose schema and model for an Expense entity in a Node.js application. The schema includes fields for user ID, amount, category, date, and description. The model is then exported for use in other parts of the application.
// This schema can be used to create, read, update, and delete expense records in a MongoDB database. The userId field is a reference to the User model, establishing a relationship between expenses and users. The amount field is a number representing the expense amount, while the category field is a string indicating the type of expense. The date field defaults to the current date if not provided, and the description field is optional.