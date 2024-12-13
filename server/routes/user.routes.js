const Router = require('express');
const userController = require('../controllers/user.controller')
const router = new Router();
const authMiddleware = require('../middlewares/auth.middleware')
const {body} = require("express-validator");


router.get('/me', authMiddleware, userController.getCurrentUser);
router.patch('/me/avatar', authMiddleware, userController.uploadUserAvatar);
router.delete('/me/avatar', authMiddleware, userController.deleteUserAvatar);
router.patch('/me/email', body('email').isEmail(), authMiddleware, userController.changeCurrentUser)
router.patch('/me/password',
    body('password').isLength({min: 3}),
    authMiddleware, userController.changeCurrentUser
)

module.exports = router