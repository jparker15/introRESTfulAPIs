// const mongoose = require('mongoose');

// const validator = require('validator');

// const Movie = new mongoose.Schema({

//     available: {
//         required: true,
//         type: Boolean
//     },

//     title: {
//         unique: true,
//         required: true,
//         type: String 
//     },

//     release: {
//         required: true,
//         type: Number
//     },

//     link: {
//         required: true,
//         type: String,
//         validate: (value) => {
            
//             const urlTest = !validator.isURL(value),

//                   imdbTest = /wiki/;

//             if (urlTest && imdbTest.test(value)) { //if the URL was not vaild

//                 throw new Error('IMDB link was invalid')
                
//             }

//         }
//     },

//     img: {
//         required: true,
//         type: String,
//         validate: (value) => {

//             const test = !validator.isURL(value)
            
//             if ( test ) {
//                 throw new Error('Image Link Not Valid')
//             }
//         }
//     },

//     inventory: {

//         required: false,

//         type: Array,

//         default: []

//     }

// })

// module.exports = mongoose.model('Movie', Movie);//what we export

const mongoose = require("mongoose");

const validator = require("validator");

    //schema for movie entries of database

const Movie = new mongoose.Schema({
    
    title: {
        unique: true,
        required: true,
        type: String
    },

    release: {
        required: true,
        type: Number
    },

    link: {
        required: true,
        type: String,
        validate: (value) => {

            const urlTest = validator.isURL(value),
                // regex to match wiki string to url to test if link is a wikipedia link
                wikiTest = /wiki/;

            if  (!urlTest || !wikiTest.test(value)){ // if URL is not valid 
                    // throw statement creates a custom error/ new instance of Error
                throw new Error("Wikipedia link was invalid");

            }

        }
    },

    img: {
        required: true,
        type: String,
        validate: (value) => {

            const test = validator.isURL(value);

            if (!test){

                throw new Error("Image Link is not valid");
            }

        }
    },

    inventory: {
        required: false,

        type: Object,

        default: {
                //type Number is added for validation 
            available:1,
            rented:0

        }
    }
    


});

// exporting model
module.exports = mongoose.model("Movie", Movie)
