const Router = require('express');
const userController = require('../controllers/user.controller')

const router = new Router();

router.post('/sign_up', userController.signUp)


module.exports = router