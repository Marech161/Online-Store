import { Cart, CartProduct, Product } from '../models';

async function createCart({
  id,
}) {
  return await Cart.create({
    userId: id,
    payStatus: false,
  });
}

async function getCartByUserId({ id }) {
  return await Cart.findOne({
    where: { userId: id, payStatus: false },
  });
}

async function getProductsForCart(id) {
  return await Cart.findByPk(id, {
    include: {
      model: Product,
      as: 'product',
      through: {
        model: CartProduct,
        attributes: [], // Убираем дублирование атрибутов из результата
      },
    },
  });
}

async function updateCartPayStatus(id) {
  await Cart.update(
    { payStatus: true },
    {
      where: {
        id,
      },
    },
  );
}

export {
  createCart,
  getCartByUserId,
  getProductsForCart,
  updateCartPayStatus,
};
