//required packages
const mongoose = require("mongoose");
//creating instance of mongoose schema class 
const User = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true

    },

    username:{
        required:true,
        type: String,
        unique: true,
        minlength:3,
        maxlength:20
    },

    password :{
        type: String,
        required: true,
        minlength:7,
        maxlength:100,
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
    },

    rentedMovies: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "movies",
        default: []
    },





})

module.exports = mongoose.model("User", User)