const express = require('express');
const { validationMiddleware } = require('../../middlewares');
const { cartSchema } = require('./cart.validation');
const cartController = require('./cart.controller');
const router = express.Router();

router.get('/', validationMiddleware(cartSchema.list),cartController.viewCart);
router.post('/add', validationMiddleware(cartSchema.add), cartController.addToCart);
router.delete('/:product_id', cartController.removeItemFromCart);
router.get('/total-price', cartController.calculateTotalPrice);



module.exports = router;
