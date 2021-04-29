const Card = require('../models/card');
const BadRequestError = require('../utils/bad-request');
const ForbiddenError = require('../utils/forbidden-err');
const NotFoundError = require('../utils/not-found');

function handleError(error) {
  if (error.name === 'CastError') {
    throw new BadRequestError('Переданы некорректные данные');
  }
}

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      handleError(err);
    })
    .catch(next);
};

const removeCard = (req, res, next) => {
  const currentUser = req.user._id;

  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Крточка не найдена');
      }
      if (card.owner.toString() !== currentUser) {
        throw new ForbiddenError('Недостаточно прав для удаления карточки');
      }
      Card.findByIdAndDelete(req.params.id)
        .then((data) => {
          res.send(data);
        })
        .catch(next);
    })
    .catch(next);
};

const addCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((data) => {
      if (!data) {
        throw new NotFoundError('Крточка не найдена');
      }
      return res.send(data);
    })

    .catch(next);
};

const deleteCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((data) => {
      if (!data) {
        throw new NotFoundError('Крточка не найдена');
      }
      return res.status(200).send(data);
    })

    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  removeCard,
  addCardLike,
  deleteCardLike,
};