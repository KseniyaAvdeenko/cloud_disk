const fileService = require('../service/file.service');
const ApiError = require('../exceptions/apiError');
const User = require('../models/user.model');
const File = require('../models/file.model')
const {json} = require("express");


class FileController {
    async createDir(req, res, next) {
        try {
            const {name, type, parent} = req.body;
            const {refreshToken} = req.cookies;
            if (!refreshToken) return next(ApiError.UnauthorizedError())
            const file = await fileService.createFile(name, type, parent, refreshToken);
            res.status(201).json(file)
        } catch (e) {
            next(e)
        }
    }

    async getUserFiles(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            if (!refreshToken) return next(ApiError.UnauthorizedError())
            const files = await fileService.getFiles(refreshToken, req.query.parent)
            return res.status(200).json(files)
        } catch (e) {
            next(e)
        }
    }

    async uploadFile(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            if (!refreshToken) return next(ApiError.UnauthorizedError())
            const file = req.files.file;
            const uploadedFile = await fileService.uploadFiles(refreshToken, req.body.parent, file)
            return res.status(201).json(uploadedFile)
        } catch (e) {
            next(e)
        }

    }
}


module.exports = new FileController();