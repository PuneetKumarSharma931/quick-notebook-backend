const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlength: [2, "Name must be atleast 2 characters long!"]
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {

            if(!validator.isEmail(value))
                throw new Error("Invalid Email!");
        }
    },

    password: {
        type: String,
        required: true,
        minlength: [3, "Password must be atleast 3 characters long!"]
    },

    timeStamp: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', async function(next){

    this.password = await bcrypt.hash(this.password, 12);

    next();
});

const user = new mongoose.model('user', UserSchema);

module.exports = user;