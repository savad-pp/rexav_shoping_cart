const db = require('../../database/models');
const { BadRequestException } = require('../../helpers/errorResponse');
const { MESSAGES } = require('../../configs');

const { Sequelize } = db
const { Op } = require('sequelize');


exports.findOne = async (useMatchQuery) => {
    return await db.Products.findOne({
        where: useMatchQuery,
    });
}

exports.findAll= async (params) => {
    const {page=1, limit=20}=params;

    return await db.Products.findAndCountAll({
        where: {available_quantity:{
            [Op.gt]:0,
        }},
         attributes: {
            exclude: ['createdAt', 'updatedAt', 'deletedAt']
        },
        raw:true,
        offset: (+page - 1) * +limit,
        limit: +limit,
        order: [["createdAt", "DESC"]]
    });
}

exports.create = async (data) => {
    const {name}=data;
    const findProduct=await this.findOne({name: {
        [Op.iLike]:name,
    }})
    if(findProduct)throw new BadRequestException(MESSAGES.PRODUCTS.alreadyExist);
    return await await db.Products.create(data) 
}