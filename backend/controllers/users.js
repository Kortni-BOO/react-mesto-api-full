const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../utils/not-found');
const BadRequestError = require('../utils/bad-request');
const ConflictingRequestError = require('../utils/conflict-request');
const AuthError = require('../utils/auth-err');

const { JWT_SECRET = 'dev-secret' } = process.env;

function handleError(error) {
  if (error.name === 'CastError') {
    throw new BadRequestError('Переданы некорректные данные');
  }
}

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send({ users }))
    .catch(next);
};

const getMe = (req, res, next) => {
  User.findById(req.user)
    .then((user) => {
      if (user) {
        res.status(200).send(user);
        return;
      }
      throw new NotFoundError('Пользователь не найден');
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).send(user);
        return;
      }
      throw new NotFoundError('Пользователь не найден');
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((data) => res.status(201).send({ data }))
    .catch((err) => {
      if (err.name === 'MongoError' || err.code === 11000) {
        throw new ConflictingRequestError('Такой email уже зарегестрирован');
      }
      throw new BadRequestError('Переданы некорректные данные');
    })
    .catch(next);
};
const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => {
      if (user) {
        res.status(200).send(user);
        return;
      }
      throw new NotFoundError('Пользователь не найден');
    })
    .catch((err) => {
      handleError(err);
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user) {
        res.status(200).send(user);
        return;
      }
      throw new NotFoundError('Пользователь не найден');
    })
    .catch((err) => {
      handleError(err);
    })
    .catch(next);
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res
        .send({ token, user });
    })
    .catch(() => {
      throw new AuthError('Необходима авторизация');
    })

    .catch(next);
};

module.exports = {
  getUsers,
  getMe,
  getUserById,
  loginUser,
  createUser,
  updateProfile,
  updateAvatar,
};