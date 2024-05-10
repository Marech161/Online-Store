import { Model } from 'sequelize';

const DateKeys = ['createdAt', 'updatedAt'];

export default class BaseModel extends Model {
  static modelName = 'baseModel';

  static tableName = 'baseModels';

  static associationScopes = {};

  static dateKeys = DateKeys;

  static protectedKeys = [];

  static mutableKeys = [];

  static Settings = {};

  static initialize(sequelize) {
    super.init(this.Schema, {
      modelName: this.modelName,
      tableName: this.tableName,
      ...this.Settings,
      sequelize,
    });
  }
}
