import { DataTypes } from 'sequelize';
import { v4 as uuid } from 'uuid';
import BaseModel from './Base';

export default class Product extends BaseModel {
  static modelName = 'product';

  static tableName = 'products';

  static protectedKeys = ['createdAt', 'updatedAt'];

  static Schema = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  };

  static Settings = {
    // define validators, indexes, hooks and etc here
    hooks: {
      async beforeCreate(product) {
        product.id = uuid();
      },
    },
  };

  static associate(models) {
    Product.belongsToMany(models.cart, {
      through: 'cartProduct',
      as: 'cart',
      foreignKey: {
        name: 'productId',
      },
    });
  }
}
