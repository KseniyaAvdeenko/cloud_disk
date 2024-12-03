const userService = require('../service/user.service')
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/apiError')

class UserController {
    async signUp(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return next(ApiError.BadRequestError('Validation error', errors.array()))
            const {email, password} = req.body;
            await userService.signUp(email, password)
            res.status(201).json({message: 'User signed up successfully'})
        } catch (e) {
            next(e)
        }
    }

    async signIn(req, res, next) {
        try {
            const {email, password} = req.body
            const user = await userService.signIn(email, password)
            res.cookie('refreshToken', user.refreshToken, {maxAge: 15 * 86400000, httpOnly: true})
            return res.json(user)
        } catch (e) {
            next(e)
        }
    }

    async signOut(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            await userService.signOut(refreshToken)
            res.clearCookie('refreshToken');
            return res.json({message: 'Signed out successfully'})
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const user = await userService.refresh(refreshToken)
            res.cookie('refreshToken', user.refreshToken, {
                maxAge: 15 * 86400000,
                httpOnly: true,
            })
            return res.json(user)
        } catch (e) {
            next(e)
        }
    }

    async getCurrentUser(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const user = await userService.getCurrentUser(refreshToken)
            res.json(user)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController();

