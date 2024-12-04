const {Schema, model} = require('mongoose');


const fileSchema = new Schema({
    name: {type: String, require: true},
    type: {type: String, require: true},
    accessLink: {type: String},
    size: {type: Number, default: 0},
    path: {type: String, default: ''},
    date: {type: Date, default: Date.now()},
    userId: {type: Schema.ObjectId, ref: 'User'},
    parent: {type: Schema.ObjectId, ref: 'File'},
    children: [{type: Schema.ObjectId, ref: 'File'}],
})

module.exports = model('File', fileSchema)