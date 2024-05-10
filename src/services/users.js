import { NotFound } from 'http-errors';
import { User } from '../models';
import { hashPassword } from '../utils';

async function getUsers() {
  const users = await User.findAll();
  if (!users) throw new NotFound('no_users_in_base');
  return users;
}

async function createUser({
  password, name,
}) {
  const hashedPassword = hashPassword(password);
  console.log('hashedPassword');
  const user = await User.create({
    password: hashedPassword,
    name,
  });
  console.log(user.toJSON());
  user.password = undefined;
  return user;
}

async function getUserById({ id }) {
  const user = await User.findByPk(id);
  if (!user) throw new NotFound('no_user_in_base');
  return user;
}

export {
  getUsers,
  createUser,
  getUserById,
};
