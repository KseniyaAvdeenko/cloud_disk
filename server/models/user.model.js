const { Schema, model} = require('mongoose')

const UserSchema = new Schema({
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    diskSpace: {type: Number, default: 1024**3*10},
    usedSpace: {type: Number, default: 0},
    avatar: {type: String},
    files: [{type: Schema.ObjectId, ref: 'file'}]
})

module.exports = model('User', UserSchema)