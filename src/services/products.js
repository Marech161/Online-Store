import { NotFound } from 'http-errors';
import { Product } from '../models';

async function getProducts() {
  const products = await Product.findAll();
  if (!products) throw new NotFound('no_products_in_base');
  return products;
}

async function getProductById({ productId }) {
  return await Product.findOne({
    where: { id: productId },
  });
}

export {
  getProducts,
  getProductById,
};
