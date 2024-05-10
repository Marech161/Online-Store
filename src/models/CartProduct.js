import { DataTypes } from 'sequelize';
import { v4 as uuid } from 'uuid';
import BaseModel from './Base';

export default class CartProduct extends BaseModel {
  static modelName = 'cartProduct';

  static tableName = 'cartsProducts';

  static protectedKeys = ['createdAt', 'updatedAt'];

  static Schema = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
  };

  static Settings = {
    // define validators, indexes, hooks and etc here
    hooks: {
      async beforeCreate(cartProduct) {
        cartProduct.id = uuid();
      },
    },
  };
}
