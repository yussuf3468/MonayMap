const mongoose = require('mongoose');
const { Schema } = mongoose;
const CategorySchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    });

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;

// This code defines a Mongoose schema and model for a Category entity in a Node.js application. The schema includes fields for user ID, name, icon, and color. The model is then exported for use in other parts of the application.
// This schema can be used to create, read, update, and delete category records in a MongoDB database. The userId field is a reference to the User model, establishing a relationship between categories and users. The name field is a string representing the category name, while the icon and color fields are strings indicating the visual representation of the category.
// This structure allows for easy categorization and visualization of expenses in a financial application.