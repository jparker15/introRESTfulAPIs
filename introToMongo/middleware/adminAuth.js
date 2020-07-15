const apiKey = process.env.MRENTAL_ADMIN;
const User = require("../models/User");

function adminAuthrzr(req,res,next){

    
    next()

}

module.exports = adminAuthrzr;