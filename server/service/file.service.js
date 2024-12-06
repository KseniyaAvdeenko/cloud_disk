const fs = require('fs');
const User = require('../models/user.model')
const File = require('../models/file.model');
const tokenService = require('./token.service');
const ApiError = require('../exceptions/apiError');

class FilesService {
    async getAuthorizedUser(refresh) {
        const userData = tokenService.validateRefreshToken(refresh);
        if (!userData) return ApiError.UnauthorizedError();
        return User.findById(userData.id);
    }

    createDir(file) {
        const filePath = process.env.FILES_PATH + `\\${file.userId}\\${file.path}`
        return new Promise(((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath)
                    return resolve({message: 'FileComponent was created'})
                } else {
                    return reject({message: "FileComponent already exists"})
                }
            } catch (e) {
                return reject({message: "FileComponent error"})
            }
        }))
    }

    async createFile(name, type, parent, refresh) {
        const currentUser = await this.getAuthorizedUser(refresh)
        const newFile = await new File({name, type, parent, userId: currentUser._id});
        const parentFile = await File.findOne({_id: parent});
        if (!parentFile) {
            newFile.path = name;
            await this.createDir(newFile);
        } else {
            newFile.path = `${parentFile.path}\\${newFile.name}`;
            await this.createDir(newFile);
            parentFile.children.push(newFile._id);
            await parentFile.save()
        }
        await newFile.save();
        return newFile
    }

    async getFiles(refresh, parent) {
        const currentUser = await this.getAuthorizedUser(refresh)
        return File.find({userId: currentUser._id, parent: parent});
    }

    async uploadFiles(refresh, id, file) {
        const currentUser = await this.getAuthorizedUser(refresh)
        const parent = await File.findOne({userId: currentUser._id, _id: id})
        if (currentUser.usedSpace + file.size > currentUser.diskSpace) return ApiError.BadRequestError('no free space')
        currentUser.usedSpace = currentUser.usedSpace + file.size;
        let path;
        parent
            ? path = process.env.FILES_PATH + `\\${currentUser._id}\\${parent.path}\\${file.name}`
            : path = process.env.FILES_PATH + `\\${currentUser._id}\\${file.name}`
        if (fs.existsSync(path)) return ApiError.BadRequestError('File already exists')
        file.mv(path);
        const type = file.name.split('.').pop()
        const dbFile = await new File({
            name: file.name,
            type,
            size: file.size,
            path: parent?.path,
            parent: parent?._id,
            userId: currentUser._id
        })
        await dbFile.save();
        await currentUser.save();
        return dbFile;
    }

    async downloadFile(refresh, fileId) {
        const currentUser = await this.getAuthorizedUser(refresh);
        const file = await File.findOne({_id: fileId, userId: currentUser._id})
        const path = process.env.FILES_PATH + `\\` + currentUser._id + `\\` + file.path + `\\` + file.name;
        if(!fs.existsSync(path)) return ApiError.BadRequestError('Path does not exist');
        return {path: path, file: file}
    }
}


module.exports = new FilesService();