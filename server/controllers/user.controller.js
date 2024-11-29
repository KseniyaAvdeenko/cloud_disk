const userService = require('../service/user.service')
const { validationResult } = require('express-validator')


class UserController {
    async signUp(req, res) {
       
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json('validation Error')
            const { email, password } = req.body
            const userData = await userService.signUp(email, password)
            res.status(201).json(userData)
        } catch (error) {
            console.log(error)
            res.send({ message: 'Server Error' })
        }
    }

}

module.exports = new UserController()