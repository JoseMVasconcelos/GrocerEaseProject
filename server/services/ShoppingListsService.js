const ShoppingList = require('./../models/shoppingList');

/**
 * Obtém todas as listas de um usuário.
 * @param {String} ownerId - Id do usuário.
 * @returns {Object} - Array de listas.
 */
async function getAllLists(ownerId) {
    const shoppingLists = await ShoppingList.find({ owners: { $in: [ownerId] } });
    return shoppingLists
}

/**
 * Cria uma lista de compras para um usuário do sistema.
 * @param {String} ownerId - Id do usuário.
 * @param {Object} payload - Dados da lista.
 * @returns {Object} - Lista de compras.
 */
async function createNewList(ownerId, payload) {
    const shoppingList = new ShoppingList(payload)
    shoppingList.owners.push(ownerId)
    await shoppingList.save()
    return shoppingList
}

/**
 * Atualiza uma lista de compras.
 * @param {String} id - Id da lista.
 * @param {String} payload - Dados da lista.
 */
async function updateList(id, payload) {
    await ShoppingList.findByIdAndUpdate(id, payload)
}

/**
 * Deleta uma lista de compras.
 * @param {String} id - Id da lista.
 */
async function deleteList(id) {
    await ShoppingList.findByIdAndRemove(id)
}

/**
 * Compartilha a lista com outro usuário.
 * @param {String} listId - Id da lista.
 * @param {String} newOwnerId - Id do novo usuário com acesso a lista.
 */
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