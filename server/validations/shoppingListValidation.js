const joi = require('joi');

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

module.exports = {
    createNewListSchema,
    updateListSchema
};