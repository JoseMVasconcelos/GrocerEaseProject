const ShoppingList = require('./../models/shoppingList');

async function getAllLists(ownerId) {
    const shoppingLists = await ShoppingList.find({ owners: { $in: [ownerId] } });
    return shoppingLists
}

async function createNewList(ownerId, payload) {
    const shoppingList = new ShoppingList(payload)
    shoppingList.owners.push(ownerId)
    await shoppingList.save()
    return shoppingList
}

async function updateList(id, payload) {
    await ShoppingList.findByIdAndUpdate(id, payload)
}

async function deleteList(id) {
    await ShoppingList.findByIdAndRemove(id)
}

async function shareList(listId, newOwnerId) {
   const list = await ShoppingList.findById(listId)
   list.owners.push(newOwnerId)
   await list.save()
}

module.exports = {
    getAllLists,
    createNewList,
    updateList,
    deleteList,
    shareList
}