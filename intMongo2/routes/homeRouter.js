const express = require("express"),

    router = express.Router();

    router.get("/", (req,res) =>{
        res.send("testeruniiyo")
    })

module.exports = router;