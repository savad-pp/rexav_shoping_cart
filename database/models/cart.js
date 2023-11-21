const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Carts extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      Carts.belongsTo(models.Products, { foreignKey: 'product_id' });      
    }
  }

  Carts.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'Carts',
      paranoid: true,
  
    }
  );
  return Carts;
};
