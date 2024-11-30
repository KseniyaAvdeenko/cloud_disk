const Router = require('express');
const userController = require('../controllers/user.controller')
const { body } = require('express-validator');
const router = new Router();

router.post('/sign_up',
    body('email').isEmail(),
    body('password').isLength({ min: 3 }),
    userController.signUp
)

router.post('/sign_in', userController.signIn)





module.exports = router