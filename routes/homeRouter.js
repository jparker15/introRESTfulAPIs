const express = require("express"),

    router = express.Router();

    router.get("/", (req,res) => {

        res.sendFile(process.cwd() + "/static/home.html");

        // console.log(process.cwd());
        

       // res.sendFile(__dirname + `./static/home.html`);
        
    });

module.exports = router;