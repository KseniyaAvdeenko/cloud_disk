const jwt = require('jsonwebtoken')
const TokenModel = require('../models/token.model')


class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: 30 * 60
        })

        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: '15d'
        })
        return {accessToken, refreshToken}
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
        } catch (e) {
            return null
        }
    }

    async saveToken(userId, refreshToken) {
        const token = await TokenModel.findOne({user: userId});
        if (token) {
            token.refresh = refreshToken;
            await token.save()
            return token
        } else {
            return await TokenModel.create({user: userId, refresh: refreshToken})
        }
    }

    async getToken(refresh) {
        return TokenModel.findOne({refresh: refresh});
    }

    async deleteToken(refresh) {
        return TokenModel.deleteOne({refresh: refresh});
    }
}

module.exports = new TokenService();