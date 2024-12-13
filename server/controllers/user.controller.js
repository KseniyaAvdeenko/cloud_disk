const userService = require('../service/user.service');
const ApiError = require('../exceptions/apiError');
const {validationResult} = require("express-validator");


class UserController {
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

    async uploadUserAvatar(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            if (!refreshToken) return next(ApiError.UnauthorizedError())
            const file = req.files;
            const user = await userService.uploadCurrentUserAvatar(refreshToken, file)
            res.json(user)
        } catch (e) {
            next(e)
        }
    }

    async deleteUserAvatar(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            if (!refreshToken) return next(ApiError.UnauthorizedError())
            const user = await userService.deleteCurrentUserAvatar(refreshToken)
            res.json(user)
        } catch (e) {
            next(e)
        }
    }

    async changeCurrentUser(req, res, next) {
        try {
            console.log(req.body)
            const errors = validationResult(req);
            if (!errors.isEmpty()) return next(ApiError.BadRequestError('Validation error', errors.array()))
            const {refreshToken} = req.cookies;
            if (!refreshToken) return next(ApiError.UnauthorizedError())
            const user = await userService.updateCurrentUserData(refreshToken, req.body)
            res.cookie('refreshToken', user.refreshToken, {
                maxAge: 15 * 86400000,
                httpOnly: true,
            })
            res.json(user)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController();

