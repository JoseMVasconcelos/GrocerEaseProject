const express = require('express');
const router = express.Router();

const { getAllLists, createNewList, updateList, deleteList, shareList } = require('./../services/ShoppingListsService')
const { createNewListSchema, updateListSchema, shareListSchema } = require('./../validations/shoppingListValidation')

router.get('/:ownerId', async (req, res) => {
    try {
        const { ownerId } = req.params
        const shoppingLists = await getAllLists(ownerId)
        return res.status(400).json(shoppingLists)
    } catch (error) {
        return res.status(500).json({ exception: error });
    }
})

router.post('/:ownerId', async (req, res) => {
    try {
        const { ownerId } = req.params;
        const { error } = createNewListSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ exception: error });
        }

        const shoppingList = await createNewList(ownerId, req.body)
        return res.status(201).json({ message: "Lista criada com sucesso", data: shoppingList });
    } catch (error) {
        return res.status(500).json({ exception: error });
    }
})

router.put('/:listId', async (req, res) => {
    try {
        const { listId } = req.params;
        const { error } = updateListSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ exception: error });
        }

        await updateList(listId, req.body)
        return res.status(200).json({ message: "Lista atualizada com sucesso" });
    } catch (error) {
        return res.status(500).json({ exception: error });
    }
})

router.delete('/:listId', async (req, res) => {
    try {
        const { listId } = req.params;
        await deleteList(listId)
        return res.status(200).json({ message: "Lista deletada com sucesso!" });
    } catch (error) {
        return res.status(500).json({ exception: error });
    }
})

router.post('/share/:listId', async (req, res) => {
    try {
        const { listId } = req.params;
        const { error } = shareListSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ exception: error });
        }
        await shareList(listId, req.body.newOwnerId)
        return res.status(200).json({ message: "Lista compartilhada com sucesso!" });
    } catch (error) {
        return res.status(500).json({ exception: error });
    }
})

module.exports = router
