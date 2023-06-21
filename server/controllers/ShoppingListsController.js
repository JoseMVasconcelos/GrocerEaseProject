const express = require('express');
const router = express.Router();

const { getAllLists, createNewList, updateList, deleteList, shareList } = require('./../services/ShoppingListsService')
const { createNewListSchema, updateListSchema, shareListSchema } = require('../validations/ShoppingListValidation')

/**
 * Objtém todas as listas de um usuário.
 * @param {String} ownerId - Id do usuário.
 * @returns {Object} - Array de listas.
 */
router.get('/', async (req, res) => {
    try {
        // Buscando o Id pelo token.
        const ownerId = req.userData.userId;
        const shoppingLists = await getAllLists(ownerId)
        return res.status(400).json(shoppingLists)
    } catch (error) {
        return res.status(500).json({ exception: error.message });
    }
})

/**
 * Cria uma lista de compras para um usuário do sistema.
 * @param {Object} req - Requisição com os dados para criar uma lista: Nome e descrição.
 * @param {String} ownerId - Id do usuário.
 * @returns {Object} - Objeto contendo mensagem de sucesso e conteudo da lista.
 */
router.post('/', async (req, res) => {
    try {
        const ownerId = req.params;
        const { error } = createNewListSchema.validate(req.body)
        if (error) return res.status(400).json({ exception: error });

        const shoppingList = await createNewList(ownerId, req.body)
        return res.status(201).json({ message: "Lista criada com sucesso", data: shoppingList });
    } catch (error) {
        return res.status(500).json({ exception: error.message });
    }
})

/**
 * Atualiza uma lista de compras.
 * @param {Object} req - Requisição com os dados para atualizar a lista: Nome, descrição, produtos.
 * @param {String} listId - Id da lista.
 * @returns {String} - Mensagem de sucesso.
 */
router.put('/:listId', async (req, res) => {
    try {
        const { listId } = req.params;
        const { error } = updateListSchema.validate(req.body)
        if (error) return res.status(400).json({ exception: error });

        await updateList(listId, req.body)
        return res.status(200).json({ message: "Lista atualizada com sucesso" });
    } catch (error) {
        return res.status(500).json({ exception: error.message });
    }
})

/**
 * Deleta uma lista de compras.
 * @param {String} listId - Id da lista.
 * @returns {String} - Mensagem de sucesso.
 */
router.delete('/:listId', async (req, res) => {
    try {
        const { listId } = req.params;
        await deleteList(listId)
        return res.status(204).json({ message: "Lista deletada com sucesso!" });
    } catch (error) {
        return res.status(500).json({ exception: error.message });
    }
})

/**
 * Compartilha a lista com outro usuário.
 * @param {String} listId - Id da lista.
 * @returns {String} - Mensagem de sucesso.
 */
router.post('/share/:listId', async (req, res) => {
    try {
        const { listId } = req.params;
        const { error } = shareListSchema.validate(req.body)
        if (error) return res.status(400).json({ exception: error });
        
        await shareList(listId, req.body.newOwnerId)
        return res.status(200).json({ message: "Lista compartilhada com sucesso!" });
    } catch (error) {
        return res.status(500).json({ exception: error.message });
    }
})

module.exports = router
