const express = require('express');
const { validationMiddleware } = require('../../middlewares');
const { productSchema } = require('./product.validation');
const productsController = require('./products.controller');
const router = express.Router();

router.get('/', validationMiddleware(productSchema.list),productsController.findAll);

router.post('/create', validationMiddleware(productSchema.create), productsController.create);

module.exports = router;
