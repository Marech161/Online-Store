import { BadRequest } from 'http-errors';

import { createUser } from './index';
import { User } from '../models';

import { comparePasswords, generateAccessToken } from '../utils';

async function login({
  name,
  password,
}) {
  const user = await User.findOne({ where: { name } });

  if (!user || !await comparePasswords(password, user?.password)) {
    throw new BadRequest('invalid_login_or_password');
  }

  return {
    access: generateAccessToken(user.id),
  };
}

async function register({
  name, password,
}) {
  let user = await User.findOne({ where: { name } });
  if (user) throw new BadRequest('User already exist');
  user = await createUser({
    name,
    password,
  });
  return user;
}

export {
  login,
  register,
};
