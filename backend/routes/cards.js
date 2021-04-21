const router = require('express').Router();
const { validateId, validateCard } = require('../middlewares/validate');
const {
  getCards, createCard, removeCard, addCardLike, deleteCardLike,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', validateCard, createCard);
router.delete('/cards/:id', validateId, removeCard);
router.put('/cards/:id/likes', validateId, addCardLike);
router.delete('/cards/:id/likes', validateId, deleteCardLike);

module.exports = router;
