const Joi = require('joi');

const productSchema = {
    create: {
        body: Joi.object().keys({
            name: Joi.string().trim().required(),
            price: Joi.number().required(),
            available_quantity: Joi.number().required()
        }),
    },
    list: {
        query: Joi.object().keys({
            page: Joi.number().optional(),
            limit: Joi.number().optional(),
        }),
    },

};

module.exports = { productSchema };
