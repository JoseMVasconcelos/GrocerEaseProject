const express = require('express');
const router = express.Router();
const TokenAuthenticator = require('./AuthMiddleware')

// Importando métodos do Service e modelos de validação.
const { getAllLists, createNewList, updateList, deleteList, shareList, addNewProduct, toggleProductState, getListProducts } = require('./../services/ShoppingListsService')
const { toggleProductSchema, createNewListSchema, updateListSchema, shareListSchema, newProductSchema } = require('../validations/ShoppingListValidation')

/**
 * Obtém todas as listas de um usuário.
 * @param {Object} req - Requisição com o token do usuário.
 * @returns {Object} - Array de listas.
 */
router.get('/', TokenAuthenticator, async (req, res) => {
    try {
        // Buscando o Id pelo token.
        const ownerId = req.userData.userId;
        const shoppingLists = await getAllLists(ownerId);
        return res.status(200).json(shoppingLists);
    } catch (error) {
        return res.status(500).json({ exception: error.message });
    }
})

/**
 * Cria uma lista de compras para um usuário do sistema.
 * @param {Object} req - Requisição com o token do usuário e os dados para criar uma lista: Nome e descrição.
 * @returns {Object} - Objeto contendo mensagem de sucesso e conteudo da lista.
 */
router.post('/', TokenAuthenticator, async (req, res) => {
    try {
        const ownerId = req.userData.userId;
        const { error } = createNewListSchema.validate(req.body);
        if (error) return res.status(400).json({ exception: error.message });

        const shoppingList = await createNewList(ownerId, req.body);
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
        const { error } = updateListSchema.validate(req.body);
        if (error) return res.status(400).json({ exception: error.message });

        await updateList(listId, req.body);
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
        await deleteList(listId);
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
        if (error) return res.status(400).json({ exception: error.message });
        
        await shareList(listId, req.body.email)
        return res.status(200).json({ message: "Lista compartilhada com sucesso!" });
    } catch (error) {
        return res.status(500).json({ exception: error.message });
    }
})

router.get('/:listId/product', async (req, res) => {
    try {
        const { listId } = req.params;
        const products = await getListProducts(listId)
        return res.status(200).json({ data: products });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ exception: error.message });
    }
})

router.post('/:listId/product', async (req, res) => {
    try {
        const { listId } = req.params;
        const { error } = newProductSchema.validate(req.body)
        if (error) return res.status(400).json({ exception: error.message });
        
        const newProduct = await addNewProduct(listId, req.body.productName)
        return res.status(200).json({ message: "Produto criado com sucesso!", data: newProduct });
    } catch (error) {
        return res.status(500).json({ exception: error.message });
    }
})

router.patch('/product/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        const { error } = toggleProductSchema.validate(req.body)
        console.log(req.body)
        if (error) return res.status(400).json({ exception: error.message });
        
        const newProduct = await toggleProductState(productId, req.body.isChecked)
        return res.status(200).json({ message: "Produto atualizado com sucesso!", data: newProduct });
    } catch (error) {
        return res.status(500).json({ exception: error.message });
    }
})

module.exports = router
