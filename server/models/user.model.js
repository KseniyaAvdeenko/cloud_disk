const { Schema, model} = require('mongoose')

const UserSchema = new Schema({
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    diskSpace: {type: Number, default: 209715200},
    usedSpace: {type: Number, default: 0},
    avatar: {type: String},
    files: [{type: Schema.ObjectId, ref: 'File'}]
})

module.exports = model('User', UserSchema)