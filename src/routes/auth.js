import { Router } from 'express';
import { handler } from '../utils';
import { login, register } from '../services';

const authRouter = Router();

authRouter
  .get(
    '/login',
    handler(async (req, res) => {
      res.render('login');
    }),
  )
  .post(
    '/login',
    handler(async (req, res) => {
      const token = await login(req.body);
      res.cookie('token', token, { httpOnly: true });
      res.redirect('/products');
    }),
  )
  .get(
    '/registration',
    handler(async (req, res) => {
      res.render('registration');
    }),
  )
  .post(
    '/registration',
    handler(async (req, res) => {
      await register(req.body);
      res.redirect(302, './login');
    }),
  );

export { authRouter };
