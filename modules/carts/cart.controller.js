const { response } = require('../../helpers');
const cartService = require('./cart.services');

exports.findOne = async (req, res, next) => {
    try {
        const {id} = req.params;
        const user_id = 1;
        const responseData = await cartService.findOne(id, user_id);
        return response.success(res, responseData);
    } catch (error) {
        next(error);
    }
};

exports.viewCart = async (req, res, next) => {
    try {
        const responseData = await cartService.viewCart();
        return response.success(res, responseData);
    } catch (error) {
        next(error);
    }
};

exports.addToCart = async (req, res, next) => {
    try {
        const body = req.body;
        const responseData = await cartService.addToCart(body);
        return response.success(res, responseData);
    } catch (error) {
        next(error);
    }
};

exports.removeItemFromCart = async (req, res, next) => {
    try {
        const responseData = await cartService.removeItemFromCart(req.params.product_id);
        return response.success(res, responseData);
    } catch (error) {
        next(error);
    }
};

exports.calculateTotalPrice = async (req, res, next) => {
    try {
        const responseData = await cartService.calculateTotalPrice();
        return response.success(res, responseData);
    } catch (error) {
        next(error);
    }
};





