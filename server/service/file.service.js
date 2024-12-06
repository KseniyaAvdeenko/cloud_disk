const fs = require('fs');
const User = require('../models/user.model')
const File = require('../models/file.model');
const tokenService = require('./token.service');
const ApiError = require('../exceptions/apiError');

class FilesService {
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
        const userData = tokenService.validateRefreshToken(refresh);
        if (!userData) return ApiError.UnauthorizedError();
        const newFile = await new File({name, type, parent, userId: userData.id});
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
        const userData = tokenService.validateRefreshToken(refresh);
        if (!userData) return ApiError.UnauthorizedError();
        const files = await File.find({userId: userData.id, parent: parent})
        return files
    }

    async uploadFiles(refresh, id, file) {
        const userData = tokenService.validateRefreshToken(refresh);
        if (!userData) return ApiError.UnauthorizedError();
        const userFromDB = await User.findById(userData.id)
        const parent = await File.findOne({userId: userFromDB._id, _id: id})
        if (userFromDB.usedSpace + file.size > userFromDB.diskSpace) return ApiError.BadRequestError('no free space')
        userFromDB.usedSpace = userFromDB.usedSpace + file.size;
        let path;
        parent
            ? path = process.env.FILES_PATH + `\\${userFromDB._id}\\${parent.path}\\${file.name}`
            : path = process.env.FILES_PATH + `\\${userFromDB._id}\\${file.name}`
        if(fs.existsSync(path)) return ApiError.BadRequestError('File already exists')
        file.mv(path);
        const type = file.name.split('.').pop()
        const dbFile = await new File({name: file.name, type, size: file.size, path: parent?.path, parent: parent?._id, userId: userFromDB._id})
        await dbFile.save();
        await userFromDB.save();
        return dbFile;
    }
}


module.exports = new FilesService();