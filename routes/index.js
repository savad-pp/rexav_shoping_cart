const express = require('express');
const router = express.Router();

const { version } = require('../package.json');

const {productRoutes} = require('../modules/products');
const {cartRoutes} = require('../modules/carts');


router.get('/', (_req, res) => {
  res.send(`API Endpoint is working. Version - ${version}`);
});

router.use('/product', productRoutes);
router.use('/cart', cartRoutes);


module.exports = router;
