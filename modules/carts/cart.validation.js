const Joi = require('joi');

const cartSchema = {
    add: {
        body: Joi.object().keys({
            product_id: Joi.number().required(),
            quantity: Joi.number().required()
        }),
    },
    list: {
        query: Joi.object().keys({
            page: Joi.number().optional(),
            limit: Joi.number().optional(),
        }),
    },

};

module.exports = { cartSchema };
