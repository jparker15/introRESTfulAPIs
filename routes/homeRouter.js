const express = require("express"),

    // routers are optionally but used for organization 
            //subObject of express/ router handles post reqs generally 
    router = express.Router();


    router.get("/", (req,res) => {

        res.sendFile(process.cwd() + "/static/home.html");

        // console.log(process.cwd());
        

       // res.sendFile(__dirname + `./static/home.html`);
        
    });

module.exports = router;