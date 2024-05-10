import { DataTypes } from 'sequelize';
import { v4 as uuid } from 'uuid';
import BaseModel from './Base';

export default class User extends BaseModel {
  static modelName = 'user';

  static tableName = 'users';

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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      protected: true,
    },
  };

  static Settings = {
    // define validators, indexes, hooks and etc here
    hooks: {
      async beforeCreate(user) {
        user.id = uuid();
      },
    },
  };

  static associate(models) {
    User.hasMany(models.cart, {
      as: 'carts',
      foreignKey: {
        name: 'userId',
      },
    });
    // define association here
  }
}
