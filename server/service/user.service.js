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
        const user = await User.create({ email: email, password: hashedPassword })
        return user;
    }
    async signIn(email, password){
        const user = await User.findOne({email: email});
        if(!user){ throw ApiError.BadRequestError(`User does not exist`, [])}
        const isPassEqual = bcrypt.compare(password, user.password)
        if (!isPassEqual) {throw ApiError.BadRequestError(`Incorrect password`, [])}
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }
}

module.exports = new UserService;

// const user = await User.findOne({email: email});
//         if (!user) {
//             throw ApiError.BadRequestError(`User does not exist`, [])
//         }
//         const isPassEqual = await bcrypt.compare(password, user.password)
        // if (!isPassEqual) {
        //     throw ApiError.BadRequestError(`Incorrect password`, [])
        // }
//         const userDto = new UserDto(user)
//         const tokens = tokenService.generateTokens({...userDto})
//         await tokenService.saveToken(userDto.id, tokens.refreshToken)
//         return {...tokens, user: userDto}