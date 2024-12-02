const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const ApiError = require('../exceptions/apiError');
const tokenService = require('./token.service')
const UserDto = require('../dto/user.dto')

class UserService {
    async signUp(email, password) {
        const candidate = await User.findOne({ email: email })
        if (candidate) {throw ApiError.BadRequestError(`User with email ${email} already exists`, [])}
        const hashedPassword = await bcrypt.hash(password, 6)
        await User.create({ email: email, password: hashedPassword })
    }
    async signIn(email, password){
        const user = await User.findOne({email: email});
        if(!user){ throw ApiError.BadRequestError(`User does not exist`, [])}
        const isPassEqual = bcrypt.compare(password, user.password)
        if (!isPassEqual) {throw ApiError.BadRequestError(`Incorrect password`, [])}
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens}
    }
    async signOut(refresh) {
        await tokenService.deleteToken(refresh)
    }

    async refresh(refresh) {
        if (!refresh) throw ApiError.UnauthorizedError()
        const userData = tokenService.validateRefreshToken(refresh);
        const tokenFromDb = await tokenService.getToken(refresh);
        if (!userData || !tokenFromDb) throw ApiError.UnauthorizedError()
        const user = await User.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens}
    }

    async getCurrentUser(refresh) {
        if (!refresh) throw ApiError.UnauthorizedError()
        const userData = tokenService.validateRefreshToken(refresh);
        const tokenFromDb = await tokenService.getToken(refresh);
        if (!userData || !tokenFromDb) throw ApiError.UnauthorizedError()
        const user = await User.findById(userData.id)
        return new UserDto(user)
    }
}

module.exports = new UserService;

