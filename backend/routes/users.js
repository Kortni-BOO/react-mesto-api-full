const router = require('express').Router();
const { validateId, validateUpdateProfile, validateUpdateAvatar } = require('../middlewares/validate');
const {
  getUsers, getMe, getUserById, updateProfile, updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getMe);
router.get('/users/:id', validateId, getUserById);
router.patch('/users/me', validateUpdateProfile, updateProfile);
router.patch('/users/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = router;
