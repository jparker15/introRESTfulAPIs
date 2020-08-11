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
const newError = require("../utils/newError");
//endware
const sendErr = require("../endware/sendErr");
const extractCookie = require("../middleware/extractCookie");

router.patch(
    "/rent_return",
    extractCookie,
    userAuth,
    async (req,res)=>{
        const {movieId, isRenting = true} = req.body;

        const user = req.user;

        try {
            const movieQuery = isRenting ? {_id:movieId, "inventory.available":{$gte:1}} : {_id:movieId};

            const userUpdate = isRenting ? { $addToSet:{ rentedMovies: movieId}} :  {$pull:{rentedMovies: movieId}};

            const movieUpdate = isRenting ? {$addToSet: {"inventory.rented":user._id}, $inc: {"inventory.available":-1}} : {$pull :{"inventory.rented":user._id}, $inc:{"inventory.available":1}};

            const movie = await Movie.findOne(movieQuery);

            if(movie === null ){
                console.log(`Movie ID error renting ${movieId}`);
                throw newError ("Movie Not Found or Unavailable", 404);
            }

            //modify user doc 
            const newUser = await User.findByIdAndUpdate(
                user,
                userUpdate,
                {new:1}
            )
            // modify movie doc
            const newMovie = await Movie.findByIdAndUpdate(
                movieId,
                movieUpdate,
                {new:1}
            )
            //ToDo

            // if the user is renting, make sure they dont already have that movie rented

            if(isRenting && user.rentedMovies.indexOf(movieId)!== -1){

                throw newError ("User Already Renting Selection: Duap Rent", 409 );
               
            }
            // if the user is returning, make sure they are currently renting the movie
            
            if(!isRenting && user.rentedMovies.indexOf(movieId) === -1 ){
                throw newError ("Cannot Return Movie Not Rented", 409);
            }

            res.json({
                message:"Success",
                user: newUser,
                movie: newMovie
            })





            
        } catch (err) {
            const errMsg = err.message || err;
            const errStat = err.status || 500;

            res.status(errStat).json({error:errMsg});
        }
    }
)

// movie renting route

//PATCH (login) route for Users
// localhost:3015/user/rent
//@desc user can rent movies by ID 
//@path (server path)/user/rent 
//@access user

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
                console.log(`movie id error renting: ${movieId}`); 
                throw newError("movie was not found or unavailable",404);
            }

        // findbyId: if(findMov.inventory.available === 0) throw newError ("movie not available")
            //check if use is already renting 
            // const userRenting = await User.findOne({_id:req.user._id})
            console.log(req.user);
            if (req.user.rentedMovies.indexOf(movieId) != -1) {

                console.log(`user tried to rent movie twice \n${movieId} \n user id:${req.user._id}`); 
                throw newError("multiple rental attempts",409);
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


        } catch (err) {
            
            // console.log(error.message, error.status);
           
            const errMsg = err.message || err;
            const errStat = err.status || 500;

            console.log(`\nerror in movie renting:\n${errMsg}\n`);

            res.status(errStat).json({
                error: errMsg
            })
            
        }
       
    }
)

// movie return route

router.patch(
    "/return",
    userAuth,
    async (req,res) =>{
        const {movieId, isRenting = true} = req.body.movieId;

        try { //movies matches given movieId and user matches user id in rented array  
            const movieQ = 
                isRenting 
                    ?{_id: movieId, "inventory.available"
                    :  { $gte:1}} : {_id: movieId};
            const userUp = 
                isRenting 
                    ? {$addToSet:{rentedMovies:movieId}}
                    :  { $pull:{rentedMovies: movieId}};

            const movieUp = 
                isRenting 
                ? {$addToSet:{ "inventory.rented":req.user._id}, $inc:{"inventory.available":- 1}}
                :  {$pull:{"inventory.rented": req.user._id}, $inc:{"inventory.available": 1}};

            const movie = await Movie.findOneAndUpdate(
                {_id:movieId},
                {
                    $inc:{"inventory.available":1},
                    $pull:{"inventory.rented":req.user._id}
                },
                {new:1}
            );

            console.log(`\nFound Movie: ${movie}`);

            if(movie === null){
                console.log(`movie id error returning: ${movieId}`);
                throw newError("movie was not found or invalid id", 404);
            };

            if(req.user.rentedMovies.indexOf(movieId) === -1){
                console.log(`User returning multiple movies \n Movie:${movieId}\nUserId:${req.user._id}`);
                throw newError("multiple return attempts", 409);
            };

            const newUser = await User.updateOne(
                {_id:req.user._id},
                {$pull:{rentedMovies:movieId}},
                {new: 1}
            );

            res.json({
                message:`returned`,
                user: newUser,
                returned_movie: movie
            });
            
        } catch (err) {

            console.log("log:",err.message,err.status)

            const errMsg = err.message || err;
            const errStat = err.status || 500;

            res.status(errStat).json({error:errMsg});

        }
    }
)

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
             
         } catch (err) {
             const errMsg = err.message || err;
             const errStat = err.status || 500;

             res.status(errStat).json({error:errMsg})

         }
});

//PATCH (login) route for Users
// localhost:3015/user
//@desc put/login a new user and store in users collections
//@path (server path)/user/post 
//@access public

router.patch(
    "/login",
    loginUser,
    async(req,res) =>{

       try {
            const token = jwt.sign({id: req.id},secret, {expiresIn:"12hr"});

            res.json({token});   
       } catch (err) {
           const errMsg = err.message || err;
           const errStat = err.status || 500

           res.status(errStat).json({
               error: errMsg
           })
       }

        
        // console.log(req.id,secret,token);

        
    
});

// Testing Routes

// router.get("/testAuth",userAuth, (req,res) =>{
//     res.send("succesfuly logged into thwe webs")
// });

// router.get("/testAdmin",adminAuth,(req,res) =>{
//     res.send("admin access granted")
// });

module.exports = router;