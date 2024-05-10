import { Sequelize } from 'sequelize';
import { dbConfig } from '../config/sequelize';
import User from './User';
import Cart from './Cart';
import Product from './Product';
import CartProduct from './CartProduct';

const {
  database, username, password, ...configs
} = dbConfig;
const sequelize = new Sequelize(database, username, password, configs);

User.initialize(sequelize);
Product.initialize(sequelize);
Cart.initialize(sequelize);
CartProduct.initialize(sequelize);

User.associate(sequelize.models);
Cart.associate(sequelize.models);
Product.associate(sequelize.models);

export {
  sequelize,
  Sequelize,
  User,
  Cart,
  Product,
  CartProduct,
};
