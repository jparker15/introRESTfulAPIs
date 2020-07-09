const User = require("../models/User");
const validator = require("validator");

module.exports = async (req,res,next) =>{

    const email = req.body.email,
        pass = req.body.password,
        failedValues = [];

    if (!validator.isEmail(email)){
    
        failedValues.push({
            key: "email",
            message: "Valid Email is Required"
        })
    }

    const emailExist = await User.findOne({email: email}) != null // expected outcome: bool

    if (emailExist) {
        failedValues.push({
            key: "email",
            message: "Email "
        })
    }

    if (!validator.isLength(pass,{min: 7, max: 25}) || !validator.isAlphanumeric(pass, "en-US")){
        failedValues.push({
            key:"password",
            message: "Character Amount Failed Requirements OR Used Invalid Character"
        })
    }

    if (failedValues.length > 0 ){
       return res.status(400).json({
            validation_err: failedValues
        })
    }
    next()
}