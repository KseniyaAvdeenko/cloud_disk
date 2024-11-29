const User = require('../models/user.model');
const bcrypt = require('bcrypt')

class UserService {
    async signUp(email, password) {
        const candidate = new User.findOne({ email: email })
        if (candidate) throw new Error(`User with email ${email} already exists`);
        const hashedPassword = await bcrypt.hash(password, 15)
        const user = await User.create({ email: email, password: hashedPassword })
        return user;
    }
}

module.exports = new UserService()