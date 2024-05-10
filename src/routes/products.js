import { Router } from 'express';
import { handler } from '../utils';
import {
  getProducts, createCart, getCartByUserId, getProductById, createCartProduct, findCartProduct,
} from '../services';
import { authenticateToken } from '../middlewares';

const productsRouter = Router();

productsRouter
  .get(
    '/',
    handler(async (req, res) => {
      const products = await getProducts();
      res.render('products', { products });
    }),
  )
  .post(
    '/',
    authenticateToken(),
    // eslint-disable-next-line consistent-return
    handler(async (req, res) => {
      let cart = await getCartByUserId(req.user);
      if (cart === null) {
        cart = await createCart(req.user);
      }
      const product = await getProductById(req.body);
      const cartProduct = await findCartProduct(cart.id, product.id);
      if (cartProduct === null) {
        await createCartProduct(cart.id, product.id);
        return res.status(201);
      }
    }),
  );

export { productsRouter };
