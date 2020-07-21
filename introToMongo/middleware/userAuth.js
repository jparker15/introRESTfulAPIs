const jwt = require("jsonwebtoken");

const User = require("../models/User");

module.exports = async (req,res,next) => {
            //destructuring alias
    const {JWT_SECRET: jwtKey , HEAD_AUTH_KEY:headerKey} = process.env;

    // console.log(jwtKey,headerKey);
  

    const userToken = req.headers[headerKey];

    try {
        
        const decodedData = jwt.verify(userToken,jwtKey);
        // console.log(decodedData); //check length when finding doc by id MongoDB id are 24 characters
        if(decodedData.id === undefined && decodedData.id.length != 24){
            throw new Error ("ID was not defined in the payload or length was invalid");
        }

        const query = {_id:decodedData.id};

        //Optional. Specifies the fields to return using projection operators. 
        // field1: <boolean> 1 = true 0 = false
        const projection = {password:0,adminProp:0};
        ////Omit this parameter to return all fields in the matching document.

        const user = await User.findOne(query,projection);

        if (user === null) {// if token is still valid but id is no longer in database
            throw new Error("user id no longer valid")
        }

        console.log(user);

        req.user = user;

        next()
        
    } catch (error) {
        const errMsg = error.message || error;
            //error for dev
        console.error(`\nerror userAuth: ${errMsg}\n`);
            //error for end user
        return res.status(401).json({
            status:401,
            message: "Not Authorized",

        });
    }
   
   

 

   
}
