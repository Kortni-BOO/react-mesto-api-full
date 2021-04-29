require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const { loginUser, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { validatePostUser, validateLogin } = require('./middlewares/validate');
const NotFoundError = require('./utils/not-found');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const whitelist = [
  'https://kisboo.mesto.nomoredomains.monster',
  'http://kisboo.mesto.nomoredomains.monster',
  'https://www.kisboo.mesto.nomoredomains.monster',
  'http://www.kisboo.mesto.nomoredomains.monster',
  'http://localhost:3000',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateLogin, loginUser);
app.post('/signup', validatePostUser, createUser);
app.use(auth);
app.use(routes);

app.use('*', () => {
  throw new NotFoundError('Такой страницы не существует');
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
