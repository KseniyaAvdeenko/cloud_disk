const Router = require('express');
const authController = require('../controllers/auth.controller')
const {body} = require('express-validator');
const router = new Router();
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/sign_up',
    body('email').isEmail(),
    body('password').isLength({min: 3}),
    authController.signUp
)
router.post('/sign_in', authController.signIn)
router.post('/sign_out', authMiddleware, authController.signOut);
router.get('/refresh', authController.refresh);



module.exports = router