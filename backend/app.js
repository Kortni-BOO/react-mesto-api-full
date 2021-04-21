const express = require('express');

const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const cardsRouter = require('./routes/cards');
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

app.use(bodyParser.json());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', validatePostUser, createUser);
app.post('/signin', validateLogin, loginUser);
app.use(auth);
app.use('/', userRoutes);
app.use('/', cardsRouter);

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
