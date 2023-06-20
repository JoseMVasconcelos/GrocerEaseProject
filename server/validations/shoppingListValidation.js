const joi = require('joi');

const listSchema = joi.object({
    name: joi.string().alphanum().required(),
    description: joi.string().alphanum().required(),
});

module.exports = {
    listSchema,
};