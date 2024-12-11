const Router = require('express');
const userController = require('../controllers/user.controller')
const router = new Router();
const authMiddleware = require('../middlewares/auth.middleware')

router.get('/me', authMiddleware, userController.getCurrentUser);
router.patch('/me/avatar', authMiddleware, userController.uploadUserAvatar);
router.delete('/me/avatar', authMiddleware, userController.uploadUserAvatar);

module.exports = router