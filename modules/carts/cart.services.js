const db = require('../../database/models');
const { BadRequestException } = require('../../helpers/errorResponse');
const { MESSAGES } = require('../../configs');
const { Sequelize,sequelize } = db
const {productService} = require('../products');

const user_id=1

exports.findOne = async (useMatchQuery) => {
    return await db.Carts.findOne({
        where: useMatchQuery,
    });
}

exports.viewCart= async () => {
    const cart= await db.Carts.findAll({
        where: {user_id},
            include: [
            {

                model: db.Products,
                attributes: ['name','price'],
            },
        ],
        attributes: [
            'id',
            'user_id',
            'quantity',
            [sequelize.literal('quantity * "Product"."price"'), 'total_price'],
          ],
    });
    if(cart.length===0)throw new BadRequestException(MESSAGES.CARTS.emptyCart);
    return cart;
}

exports.addToCart = async (data) => {
    const {product_id,quantity}=data;
    const findProducts=await productService.findOne({id:product_id})
    if(!findProducts)throw new BadRequestException(MESSAGES.PRODUCTS.productNotFound);
    if(findProducts.available_quantity<quantity)throw new BadRequestException(MESSAGES.PRODUCTS.outOfStock);
    const findProductFromCart=await this.findOne({product_id})
    if(findProductFromCart){
        await await db.Carts.update({quantity},{where:{user_id,product_id}}) 
    }else{
        await await db.Carts.create({...data,user_id}) 
    }
    return await this.viewCart()

}

exports.removeItemFromCart = async (product_id) => {
    const findProductFromCart=await this.findOne({product_id,user_id})
    if(!findProductFromCart)throw new BadRequestException(MESSAGES.CARTS.notFound);
    return await await db.Carts.destroy({where:{product_id,user_id}}) 
}

exports.calculateTotalPrice = async () => {
        const result =  await sequelize.query(`
        SELECT SUM("Cart"."quantity" * "Product"."price") AS total_cart_price
        FROM "Carts" AS "Cart"
        INNER JOIN "Products" AS "Product" ON "Cart"."product_id" = "Product"."id"
        WHERE "Cart"."user_id" = ${user_id} and "Cart"."deletedAt" is NULL
      `, {
        type: Sequelize.QueryTypes.SELECT,
      });
  
    return result[0]?.total_cart_price || 0
}