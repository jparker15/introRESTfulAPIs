const jwt = require("jsonwebtoken");

module.exports = (req,res,next) => {
            //destructuring alias
    const {JWT_SECRET: jwtKey , HEAD_AUTH_KEY:headerKey} = process.env;

    // console.log(jwtKey,headerKey);
  

    const userToken = req.headers[headerKey];

    try {
        
        const decodedData = jwt.verify(userToken,jwtKey);
        // console.log(decodedData);
        if(decodedData.id === undefined){
            throw new Error ("ID was not defined in the payload");
        }

        req.userID = decodedData.id;

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
