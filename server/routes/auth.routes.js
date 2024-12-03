const Router = require('express');
const userController = require('../controllers/user.controller')
const {body} = require('express-validator');
const router = new Router();
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/sign_up',
    body('email').isEmail(),
    body('password').isLength({min: 3}),
    userController.signUp
)
router.post('/sign_in', userController.signIn)
router.post('/sign_out', authMiddleware, userController.signOut);
router.get('/refresh', userController.refresh);



module.exports = router