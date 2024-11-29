const userService = require('../service/user.service')

class UserController {
    async signUp(req, res) {
        try {
            const { email, password } = req.body
            const userData = await userService.signUp(email,password)
            res.status(201).json(userData)
        } catch (error) {
            console.log(error)
            res.send({ message: 'Server Error' })
        }
    }

}

module.exports = new UserController()