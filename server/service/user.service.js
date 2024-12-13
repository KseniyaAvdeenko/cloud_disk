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
        if (!user) throw ApiError.BadRequestError(`User does not exist`, [])
        const isPassEqual = bcrypt.compare(password, user.password)
        if (!isPassEqual) throw ApiError.BadRequestError(`Incorrect password`, [])
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
        return {...tokens, user: userDto}
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
        data.file.mv(process.env.STATIC_PATH + '\\' + avatarName)
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

    async updateCurrentUserData(refresh, data) {
        const currentUser = await this.getAuthorizedUser(refresh);
        if (data.email) currentUser.email = data.email;
        if (data.password) currentUser.password = data.password;
        await currentUser.save()
        const userDto = new UserDto(currentUser);
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }
}

module.exports = new UserService();

