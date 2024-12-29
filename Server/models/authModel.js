const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    jwt:{
      type:String,
      required:false
    },
    isAdmin:{
        type:Boolean,
        required:false
    },
    isDoctor:{
        type:Boolean,
        required:false
    },
    isPatient:{
        type:Boolean,
        required:false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const authModel = mongoose.model('authModel', userSchema);

module.exports = { authModel };
