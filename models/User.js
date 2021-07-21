const mongoose = require('mongoose');
const {schema} = require('./secure/userValidation');

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        requierd: true,
        minLength: 4,
        maxLength: 100
    },
    createAt: {
        type: Date,
        default: Date.now(),
    }
})

module.exports = mongoose.model("User", UserSchema)

