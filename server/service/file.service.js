const fs = require('fs');
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
                    return resolve({message: 'File was created'})
                } else {
                    return reject({message: "File already exists"})
                }
            } catch (e) {
                return reject({message: "File error"})
            }
        }))
    }

    async createFile(name, type, parent, refresh) {
        const userData = tokenService.validateRefreshToken(refresh);
        if(!userData) return ApiError.UnauthorizedError();
        const newFile = await File({name, type, parent, userId: userData.id});
        const parentFile = await File.findOne({_id: parent});
        if(!parentFile){
            newFile.path = name;
            await this.createDir(newFile);
        }else{
            newFile.path = `${parentFile.path}\\${newFile.name}`;
            await this.createDir(newFile);
            parentFile.children.push(newFile._id);
            await parentFile.save()
        }
        await newFile.save();
        return newFile
    }

    async getFiles(refresh, parent){
        const userData = tokenService.validateRefreshToken(refresh);
        if(!userData) return ApiError.UnauthorizedError();
        const files = await File.find({userId: userData.id, parent: parent})
        return files
    }
}


module.exports = new FilesService();