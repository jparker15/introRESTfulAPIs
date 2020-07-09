const User = require("../models/User");

// const express = require("express");
// const router = express.Router();

const router = require("express").Router();
const validator = require("validator");
const validUser = require("../middleware/validUser")
//POST route for Users
//
//@desc post/make a new user and store in users collections
//@path (server path)/user/postlocalhost:3015/user
//@access admin level 
router.post("/", validUser, async(req,res) =>{
   
   
    try {

       const newUser = await User.create(req.body);

        res.json({
            msg: "user created",
            document:newUser
        })
        
    } catch (error) {
        res.status(500).json({
            status:500,
            error:error.message || error
        })
    }
    
})





module.exports = router;