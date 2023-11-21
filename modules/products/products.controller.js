const { response } = require('../../helpers');
const productService = require('./product.services');

exports.findOne = async (req, res, next) => {
    try {
        const {id} = req.params;
        const user_id = 1;
        const responseData = await productService.findOne(id, user_id);
        return response.success(res, responseData);
    } catch (error) {
        next(error);
    }
};

exports.findAll = async (req, res, next) => {
    try {
        const responseData = await productService.findAll(req.query);
        return response.success(res, responseData);
    } catch (error) {
        next(error);
    }
};

exports.create = async (req, res, next) => {
    try {
        const body = req.body;
        const responseData = await productService.create(body);
        return response.success(res, responseData);
    } catch (error) {
        next(error);
    }
};



