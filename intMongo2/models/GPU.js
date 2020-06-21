const mongoose = require("mongoose"),
     
    validator = require("validator");


const GPU = new mongoose.Schema({
    brand: {
        required: true,
        type: String
    },

    generation:{
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
    },

    img :{
        type: String,
        validate: (value) => {
            const urlTest = validator.isURL(value);

            if (!urlTest){
                throw new Error("Image Link was Invalid");
            }
        }
    }

    
});

module.exports = mongoose.model("GPU", GPU);
