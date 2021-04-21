const jwt = require('jsonwebtoken');
const AuthError = require('../utils/auth-err');

const { JWT_SECRET = 'dev-secret' } = process.env;

function getCookie(req) {
  const { cookie } = req.headers;
  if (cookie) {
    const values = cookie.split(';').reduce((res, item) => {
      const data = item.trim().split('=');
      return { ...res, [data[0]]: data[1] };
    }, {});
    return values;
  }
  return undefined;
}
const auth = (req, res, next) => {
  const cookies = getCookie(req);
  if (!cookies) {
    throw new AuthError('Необходима авторизация');
  } else {
    const token = cookies.jwt;
    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      throw new AuthError('Необходима авторизация');
    }
    req.user = payload;

    next();
  }
};
module.exports = auth;
