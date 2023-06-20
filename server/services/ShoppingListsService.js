const ShoppingList = require('./../models/shoppingList');

async function getAllLists(ownerId) {
    const shoppingLists = await ShoppingList.find({ author: ownerId });
    return shoppingLists
}

async function createNewList(ownerId, payload) {
    const shoppingList = new ShoppingList(payload)
    shoppingList.owner = ownerId
    await shoppingList.save()
    return shoppingList
}

async function updateList(id, payload) {
    await ShoppingList.findByIdAndUpdate(listId, payload)
}

async function deleteList(id) {
    await ShoppingList.findByIdAndRemove(id)
}

module.exports = {
    getAllLists,
    createNewList,
    updateList,
    deleteList
}