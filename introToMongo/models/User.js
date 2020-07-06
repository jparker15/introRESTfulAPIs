//required packages
const mongoose = require("mongoose");
//creating instance of mongoose schema class 
const User = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true

    },

    password :{
        type: String,
        required: true,
        minlength:7,
        maxlength:25,
    },

    adminProp: {
        adminLvl: {
            type: Number,
            default: 0
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    }



})

module.exports = mongoose.model("User", User)