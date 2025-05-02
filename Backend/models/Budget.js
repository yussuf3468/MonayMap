const mongoose = require('mongoose');
const { Schema } = mongoose;

const BudgetSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    });

module.exports = mongoose.model('Budget', BudgetSchema);
// This code defines a Mongoose schema and model for a Budget entity in a Node.js application. The schema includes fields for user ID, category, amount, start date, and end date. The model is then exported for use in other parts of the application.