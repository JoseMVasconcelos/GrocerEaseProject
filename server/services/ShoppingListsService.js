const ShoppingList = require('../models/ShoppingListModel');
const Product = require('../models/ProductModel');
const User = require('../models/UserModel');

/**
 * Obtém todas as listas de um usuário.
 * @param {String} ownerId - Id do usuário.
 * @returns {Object} - Array de listas.
 */
async function getAllLists(ownerId) {
    const shoppingLists = await ShoppingList.find({ owners: { $in: [ownerId] } });
    return shoppingLists;
}

/**
 * Cria uma lista de compras para um usuário do sistema.
 * @param {String} ownerId - Id do usuário.
 * @param {Object} payload - Dados da lista.
 * @returns {Object} - Lista de compras.
 */
async function createNewList(ownerId, payload) {
    const shoppingList = new ShoppingList(payload);
    shoppingList.owners.push(ownerId);
    await shoppingList.save();
    return shoppingList;
}

/**
 * Atualiza uma lista de compras.
 * @param {String} listId - Id da lista.
 * @param {String} payload - Dados da lista.
 */
async function updateList(listId, payload) {
    await ShoppingList.findByIdAndUpdate(listId, payload);
}

/**
 * Deleta uma lista de compras.
 * @param {String} listId - Id da lista.
 */
async function deleteList(listId) {
    await ShoppingList.findByIdAndRemove(listId)
}

/**
 * Compartilha a lista com outro usuário.
 * @param {String} listId - Id da lista.
 * @param {String} newOwnerId - Id do novo usuário com acesso a lista.
 */
async function shareList(listId, email) {
   const list = await ShoppingList.find(listId)
   const user = await User.find({ email: email })
   list.owners.push(user)
   await list.save()
}

async function addNewProduct(listId, productName) {
   const list = await ShoppingList.findById(listId)
   const newProduct = Product({
        name: productName,
        isChecked: false
   })
   const savedProduct = await newProduct.save();

   list.products.push(savedProduct._id)
   await list.save()

   return savedProduct
}

async function toggleProductState(productId, isChecked) {
   const product = await Product.findById(productId)
   product.isChecked = isChecked
   await product.save();
}

async function getListProducts(listId) {
    const list = await ShoppingList.findById(listId).populate('products')
    return list.products
}

module.exports = {
    getAllLists,
    createNewList,
    updateList,
    deleteList,
    shareList,
    addNewProduct,
    toggleProductState,
    getListProducts
}