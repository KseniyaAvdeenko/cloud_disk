const userService = require('../service/user.service');
const fileService = require('../service/file.service')
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/apiError');
const File = require("../models/file.model");

class UserController {
    async signUp(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return next(ApiError.BadRequestError('Validation error', errors.array()))
            const {email, password} = req.body;
            const newUser = await userService.signUp(email, password)
            await fileService.createDir(new File({userId: newUser._id, name: ''}))
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
            if (!refreshToken) return next(ApiError.UnauthorizedError())
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
            if (!refreshToken) return next(ApiError.UnauthorizedError())
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
            if (!refreshToken) return next(ApiError.UnauthorizedError())
            const user = await userService.getCurrentUser(refreshToken)
            res.json(user)
        } catch (e) {
            next(e)
        }
    }
    async updateCurrentUserAvatar(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            if (!refreshToken) return next(ApiError.UnauthorizedError())
            const data = req.files;

            const user = await userService.updateCurrentUserAvatar(refreshToken, data)
            res.json(user)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController();

