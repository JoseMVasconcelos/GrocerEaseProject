const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: String,
    isChecked: Boolean
})

module.exports = mongoose.model('Product', productSchema);