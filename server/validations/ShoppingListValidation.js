const joi = require('joi');

// Esquemas de validação para a lista de compras.
const createNewListSchema = joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
});

const updateListSchema = joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    products: joi.array().items(
        joi.object({
            name: joi.string().required(),
            isChecked: joi.boolean().required(),
        })
    ).required()
});

const shareListSchema = joi.object({
    email: joi.string().email().required()
});

const newProductSchema = joi.object({
    productName: joi.string().required()
});

const toggleProductSchema = joi.object({
    isChecked: joi.boolean().required()
});

module.exports = {
    createNewListSchema,
    updateListSchema,
    shareListSchema,
    newProductSchema,
    toggleProductSchema
};
