const express = require('express');
const router = express.Router();

const ShoppingList = require('./../models/shoppingList');

router.get('/:ownerId', async (req, res) => {
    const { ownerId } = req.params;
    const shoppingLists = await ShoppingList.find({ author: ownerId });
    res.json(shoppingLists)
})

router.post('/:ownerId', async (req, res) => {
    const { ownerId } = req.params;
    const { name, description } = req.body
    const shoppingList = new ShoppingList({name, description})
    shoppingList.owner = ownerId
    await shoppingList.save()
    return res.status(201).json({ message: "test" });
})

router.put('/:listId', async (req, res) => {
    const { listId } = req.params;
    await ShoppingList.findByIdAndUpdate(listId, req.body)
    return res.status(201).json({ message: "test" });
})

router.delete('/:listId', async (req, res) => {
    const { listId } = req.params;
    await ShoppingList.findByIdAndRemove(listId)
    return res.status(201).json({ message: "test" });
})

module.exports = router
