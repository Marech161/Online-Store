import { Router } from 'express';

import { handler } from '../utils';
import { getUsers, getUserById } from '../services';
import { authenticateToken } from '../middlewares';

const usersRouter = Router();

usersRouter
  .get(
    '/',
    authenticateToken(),
    handler(async (req, res) => {
      const users = await getUsers();
      res.json(users);
    }),
  )

  .get(
    '/:id',
    authenticateToken(),
    handler(async (req, res) => {
      const users = await getUserById(req.params);
      res.json(users);
    }),
  );

export { usersRouter };
