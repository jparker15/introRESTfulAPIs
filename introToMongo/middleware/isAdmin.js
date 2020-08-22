const User = require("../models/User");

const jwt = require("jsonwebtoken");

module.exports = async (req,res,next)=> {

  
    // console.log(req.authKey);

    const {JWT_SECRET: jwtKey} = process.env;

    const usrTkn = req.authKey;

    try {

        const decryptedId  = jwt.verify(usrTkn,jwtKey);

        const adCheck = await User.findOne({_id:decryptedId.id},{"adminProp.isAdmin": true});

        // if(adCheck !== null){
        //     req.isAdmin = true
        // }

        // console.log(adCheck);

        // if(adCheck.adminProp.isAdmin == true){
        //     console.log("is an admin");
        // } else{
        //     console.log("not an admin");
        // }
            
            req.isAdmin = true === adCheck.adminProp.isAdmin; 

            req.userId = decryptedId.id;

            // console.log(req.isAdmin);

        next()

    } catch (err) {
        console.log(err.message||err);
        next()
    }

    

}