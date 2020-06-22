const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    login: {type: String, require: true, unique: true},
    hash: {type: String, require: true, unique: true},
    email:{type: String, require: true},
    cigaretsPerDay: Number,
    duration: Number,
    price: Number,
    firstSetupDate: Date
}, {strict: true})

module.exports = mongoose.model('User', userSchema);