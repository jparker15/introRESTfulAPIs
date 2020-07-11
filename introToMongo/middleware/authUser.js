const User = require("../models/User");
const validator = require("validator");
const bcrypt = require("bcrypt");

const failedLogin = (req,res) => {
    return res.status(409).json({msg: "Login Has Failed"});
}

module.exports = async (req,res,next) => {
    //
    try {
        const email = req.body.email,
            emailValid = 
        (email === undefined || email.trim() === "" )
            ? false
            : validator.isEmail(email);

        if (!emailValid) {
            console.error(`\nLogin Failed: Email Not Valid`)
            failedLogin()
        }
            
           

        const user = await User.findOne({email: req.body.email});
        //findOne returns one document if query satisfied or returns null
        if (user === null ){
            console.error(`\nLogin Failed: Email Not in Use`)
            failedLogin()
        }

        const pass = req.body.password;
                            // if undefined or empty string its false: else await bcrypt
        const passTest = 
        (pass === undefined || pass.trim() === "" ) 
        ? false 
        : await bcrypt.compare(pass,user.password);

        if (!passTest){
            console.error(`\nLogin Failed: Password Invalid`)
            failedLogin()
        }

        req.id = user._id;

        next() //if code execution reaches herer, it is assumed the user has successfully logged in

    } catch (error) {
        json.status(500).json({
            errorAt: error.stack,
            message: error.message || error
        })
    }

   

    // req.user = // the user
}
    
