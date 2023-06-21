const mongoose = require('mongoose');
const { Schema } = mongoose;

const shoppingListSchema = new Schema({
    name: String,
    description: String,
    products: [
        {
            name: String,
            isChecked: Boolean
        }
    ],
    owners: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

module.exports = mongoose.model('ShoppingList', shoppingListSchema);