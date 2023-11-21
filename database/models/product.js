const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      Products.hasMany(models.Carts, { foreignKey: 'product_id' });
    }
  }

  Products.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DOUBLE(10,2),
        allowNull: false
      },
      available_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'Products',
      paranoid: true,
      indexes: [
        {
          fields: ['name'],
          unique: true,
        },
      ],
    }
  );
  return Products;
};
