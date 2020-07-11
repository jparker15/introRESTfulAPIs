const User = require("../models/User");
const router = require("express").Router();
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validUser = require("../middleware/validUser");
const authUser = require("../middleware/authUser");
const secret = process.env.JWT_SECRET;


//POST route for Users
//localhost:3015/user/
//@desc post/make a new user and store in users collections
//@path (server path)/user/
//@access public

router.post(
    "/",
    validUser
    ,async (req,res) =>{
    //block a user from bypassing admin level and isAdmin

    //encrypt password for safe DB storage
    
    const salt = await bcrypt.genSalt(7);

    const hashedPass = await bcrypt.hash( req.body.password, salt);
    console.log(salt, bcrypt.getRounds(hashedPass));
    req.body.password = hashedPass

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

//PATCH (login) route for Users
// localhost:3015/user
//@desc put/login a new user and store in users collections
//@path (server path)/user/post 
//@access public

router.patch(
    "/",
    authUser,
    async(req,res) =>{

        const token = jwt.sign({id: req.id},secret);

        res.json(token)
    
    }    
)





module.exports = router;