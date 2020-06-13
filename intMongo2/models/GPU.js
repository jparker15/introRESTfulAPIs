const mongoose = require("mongoose"),
     
    validator = require("validator");


const GPU = new mongoose.Schema({
    brand: {
        required: true,
        type: String
    },

    name: {
        required: true,
        type: String
    },

    codeName: {
        type: String
    },

    msrp: {
        required: true,
        type: Number
    }

    
});

module.exports = mongoose.model("GPU", GPU);
