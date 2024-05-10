// import { BadRequest, Forbidden } from 'http-errors';
import { verifyToken } from '../utils';
import { User } from '../models';

export function authenticateToken() {
  // eslint-disable-next-line consistent-return
  return async (req, res, next) => {
    if (!req.cookies || !req.cookies.token || !req.cookies.token.access) {
      return res.redirect('auth/registration');
    }
    const token = req.cookies.token.access;
    try {
      req.user = verifyToken(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
      return res.redirect('auth/registration');
    }
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.redirect('auth/registration');
    } req.user = user;

    next();
  };
}
