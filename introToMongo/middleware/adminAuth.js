const User = require("../models/User");

const jwt = require("jsonwebtoken");
module.exports = async (req,res,next) => {

   const {
       JWT_SECRET: jwtKey,
       HEAD_AUTH_KEY: headerKey
   } = process.env;

   const userTkn = req.authKey

//    console.log(userTkn);
   
   try {//  jwt verifing userToken
       const decodedData = jwt.verify(userTkn,jwtKey);

       if(decodedData.id === undefined && decodedData.id.length != 24){
        throw new Error ("ID was not defined in the payload or length was invalid");
    }

       const query = {_id: decodedData.id, "adminProp.isAdmin":true},
            //info to include or exclude 
            projection = {password:0, __V: 0,}
    
      const adminInfo = await User.findOne(
            query,projection
          );

        if(adminInfo === null) throw new Error ("user is not an admin")

       req.admin = adminInfo;

       next()

   } 
   catch (error) {
    
        const errMsg = error.message || error;
        //error for dev
        console.error(`\nerror userAdmin: ${errMsg}\n`);
        //error for end user
        return res.status(401).json({
            
            status:401,
            message: "Not Authorized",
        });
   }
}