import { CartProduct } from '../models';

async function createCartProduct(
  cartId,
  productId,
) {
  console.log(cartId);
  await CartProduct.create({
    cartId,
    productId,
  });
}

async function findCartProduct(
  cartId,
  productId,
) {
  return await CartProduct.findOne({
    where:
      {
        cartId,
        productId,
      },
  });
}

export {
  createCartProduct,
  findCartProduct,
};
