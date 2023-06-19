const mongoose = require('mongoose');
const { Schema } = mongoose;

const shoppingListSchema = new Schema({
    name: String,
    description: String,
    products: [
        {
            name: String,
            description: String
        }
    ],
    author: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('ShoppingList', shoppingListSchema);