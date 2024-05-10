import { DataTypes } from 'sequelize';
import { v4 as uuid } from 'uuid';
import BaseModel from './Base';

export default class Cart extends BaseModel {
  static modelName = 'cart';

  static tableName = 'carts';

  static protectedKeys = ['createdAt', 'updatedAt'];

  static Schema = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    payStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  };

  static Settings = {
    // define validators, indexes, hooks and etc here
    hooks: {
      async beforeCreate(cart) {
        cart.id = uuid();
      },
    },
  };

  static associate(models) {
    Cart.belongsTo(models.user, {
      as: 'user',
      foreignKey: {
        name: 'userId',
      },
    });
    Cart.belongsToMany(models.product, {
      through: 'cartProduct',
      as: 'product',
      foreignKey: {
        name: 'cartId',
      },
    });
  }
}
