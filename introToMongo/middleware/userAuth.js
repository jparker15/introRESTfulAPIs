const jwt = require("jsonwebtoken");

module.exports = async (req,res,next, adminLvl) => {
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

        const user = await findOne({_id:decodedData.id});

        if (user === null) {
            throw new Error("user id in payload wa")
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
