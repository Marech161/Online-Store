import { Router } from 'express';

import { handler } from '../utils';
import {
  createCart, getCartByUserId, getProductsForCart, updateCartPayStatus,
} from '../services';
import { authenticateToken } from '../middlewares';

const cartsRouter = Router();

cartsRouter
  .get(
    '/',
    authenticateToken(),
    // eslint-disable-next-line consistent-return
    handler(async (req, res) => {
      let cart = await getCartByUserId(req.user);
      if (cart === null) {
        cart = await createCart(req.user);
      }
      const cartProducts = await getProductsForCart(cart.id);
      res.render('cart', { cartProducts });
    }),
  )

  .post(
    '/',
    authenticateToken(),
    handler(async (req, res) => {
      const cart = await getCartByUserId(req.user);
      await updateCartPayStatus(cart.id);
      await createCart(req.user);
      return res.redirect(302, '/products');
    }),
  );

export { cartsRouter };
