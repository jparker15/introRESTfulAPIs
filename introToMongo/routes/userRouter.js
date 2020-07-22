//models
const User = require("../models/User");
const Movie = require("../models/Movie");
//constance variables
const secret = process.env.JWT_SECRET;
//depends
const router = require("express").Router();
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//midware
const validUser = require("../middleware/validUser");
const loginUser = require("../middleware/loginUser");
const userAuth = require("../middleware/userAuth");
const adminAuth = require("../middleware/adminAuth");
//utils
const newError = require("../utils/newError")

// movie renting route

router.patch(
    "/rent/",
    userAuth,
    async (req,res) =>{
        const movieId = req.body.movieId;
        
        try {
            //make sure the movie can be rented
           const findMov = await Movie.findOne({_id: movieId, "inventory.available":{$gte:1}});
           
           console.log(`\nFound Movie: ${findMov}`);

           if(findMov === null){
                console.log(`movie id error renting ${movieId}`); 
                throw newError("movie was not found or unavailable",404);
            }

        // findbyId: if(findMov.inventory.available === 0) throw newError ("movie not available")
            //check if use is already renting 
            // const userRenting = await User.findOne({_id:req.user._id})
            console.log(req.user);
            if (req.user.rentedMovies.indexOf(movieId) != -1) {

                console.log(`user tried to rent movie twice \n${movieId} \n user id:${req.user._id}`); 
                throw newError("movie was not found or unavailable",409);
            }

            //modify the user doc
           const newUser = await User.updateOne(
                {_id: req.user._id},
                //mongodb addToSet operator
                {$addToSet:{rentedMovies:movieId}},
                {new: 1}
                )

            // modify the movie doc

            const newMovie = await Movie.updateOne(
                {_id:movieId},
                {
                    $addToSet:{"inventory.rented": req.user._id},
                    $inc:{"inventory.available": -1}
                },
                {new: 1}
                
            )

            res.json({
                message:"success",
                user: newUser,
                movie: newMovie
            })


        } catch (error) {
            
            console.log(error.message, error.status);
           
            const errMsg = error.message || error;
            const errSts = error.status || error;

            console.log(`\nerror in movie renting:\n${errMsg}\n`);

            res.status(errSts || 500).json({
                err: errMsg
            })
            
        }
       
    }
)

// movie return route

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
    req.body.password = hashedPass;

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
});

//PATCH (login) route for Users
// localhost:3015/user
//@desc put/login a new user and store in users collections
//@path (server path)/user/post 
//@access public

router.patch(
    "/",
    loginUser,
    async(req,res) =>{

        // req.id = undefined; test

        const token = jwt.sign({id: req.id},secret, {expiresIn:"1hr"});

        // console.log(req.id,secret,token);

        res.json({token});
    
});

// Testing Routes

// router.get("/testAuth",userAuth, (req,res) =>{
//     res.send("succesfuly logged into thwe webs")
// });

// router.get("/testAdmin",adminAuth,(req,res) =>{
//     res.send("admin access granted")
// });

module.exports = router;