
        //express requirement
 const express = require("express"),
        //instance of express' Router()
    router = express.Router();
        //model for Movie requirement

        router.get("/", (req,res) => {
            //cwd is directory of whole project 

            const fileLoc = process.cwd() + `\\public\\home-static\\home.html`;
            
            res.sendFile(fileLoc);
        });



module.exports = router;