const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const ApiError = require('../exceptions/apiError');
const tokenService = require('./token.service');
const UserDto = require('../dto/user.dto');
const fs = require("fs");
const Uuid = require('uuid')


class UserService {

    async getAuthorizedUser(refresh) {
        const userData = tokenService.validateRefreshToken(refresh);
        if (!userData) return ApiError.UnauthorizedError();
        return User.findById(userData.id);
    }

    async signUp(email, password) {
        const candidate = await User.findOne({email: email});
        if (candidate) {
            throw ApiError.BadRequestError(`User with email ${email} already exists`, [])
        }
        const hashedPassword = await bcrypt.hash(password, 6);
        const newUser = await User({email: email, password: hashedPassword});
        newUser.save()
        return newUser
    }

    async signIn(email, password) {
        const user = await User.findOne({email: email});
        if (!user) {
            throw ApiError.BadRequestError(`User does not exist`, [])
        }
        const isPassEqual = bcrypt.compare(password, user.password)
        if (!isPassEqual) {
            throw ApiError.BadRequestError(`Incorrect password`, [])
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens}
    }

    async signOut(refresh) {
        await tokenService.deleteToken(refresh)
    }

    async refresh(refresh) {
        const currentUser = await this.getAuthorizedUser(refresh);
        const tokenFromDb = await tokenService.getToken(refresh);
        if (!currentUser || !tokenFromDb) throw ApiError.UnauthorizedError()
        const userDto = new UserDto(currentUser)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens}
    }

    async getCurrentUser(refresh) {
        const currentUser = await this.getAuthorizedUser(refresh);
        const tokenFromDb = await tokenService.getToken(refresh);
        if (!currentUser || !tokenFromDb) throw ApiError.UnauthorizedError()
        return new UserDto(currentUser)
    }

    async uploadCurrentUserAvatar(refresh, data) {
        const currentUser = await this.getAuthorizedUser(refresh);
        const avatarName = Uuid.v4() + '.jpg';
        data.mv(process.env.STATIC_PATH + '\\' + avatarName)
        currentUser.avatar = avatarName
        await currentUser.save();
        return new UserDto(currentUser)
    }

    async deleteCurrentUserAvatar(refresh) {
        const currentUser = await this.getAuthorizedUser(refresh);
        fs.unlinkSync(process.env.STATIC_PATH + '\\' + currentUser.avatar);
        currentUser.avatar = null;
        await currentUser.save();
        return new UserDto(currentUser)
    }
}

module.exports = new UserService();

// const currentUser = await userService.getAuthorizedUser(refresh);
//         const parent = await File.findOne({userId: currentUser._id, _id: id})
//         if (currentUser.usedSpace + file.size > currentUser.diskSpace) return ApiError.BadRequestError('no free space')
//         currentUser.usedSpace = currentUser.usedSpace + file.size;
//         let path;
//         let filePath;
//         if (parent) {
//             path = process.env.FILES_PATH + `\\${currentUser._id}\\${parent.path}\\${file.name}`
//             filePath = parent.path + '\\' + file.name;
//         } else {
//             path = process.env.FILES_PATH + `\\${currentUser._id}\\${file.name}`
//             filePath = file.name;
//         }
//         if (fs.existsSync(path)) return ApiError.BadRequestError('File already exists')
//         file.mv(path);
//         const type = file.name.split('.').pop()
//         const dbFile = await new File({
//             name: file.name,
//             type,
//             size: file.size,
//             path: filePath,
//             parent: parent?._id,
//             userId: currentUser._id
//         })
//         if (parent) {
//             parent.children.push(dbFile._id);
//             await parent.save()
//         }
//         await dbFile.save();
//         await currentUser.save();
//         return dbFile;