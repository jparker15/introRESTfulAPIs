
        //express requirement
const express = require("express"),
        //instance of express' Router()
    router = express.Router(),
        //model for Movie requirement
    Movie = require("../models/Movie"),

    adminAuth = require("../middleware/adminAuth"),

    userAuth = require("../middleware/userAuth"),

    extractCookie = require("../middleware/extractCookie");

        // router.get("/:request params/:reqParams",(req,res) =>{
        //     location = `${location.origin}/mrental`
        //     res.send("yah")
        // })

        router.get("/login", (req,res) =>{
            res.render("login");
        })

        //default GET route
        //localhost:3015/mrental
        //@desc post/ movie database page
        //@path (server path)/mrental
        //@access users 

        router.get("/",
                extractCookie,
                async (req,res) =>{

                const loggedIn = req.authkey != undefined;

                const isAdmin = req.admin != undefined;

                                            //"nested object": {mongodb query selector:}
                const allMovies = await Movie.find({"inventory.available":{$gte:1}}),//matches values that are greater then or equal to a specified value

                clientMsg = `Number of Movies:` + allMovies.length; 

            res.render("home", {all_movies: allMovies, message: clientMsg, isLoggedIn: loggedIn, admin: isAdmin})
        });


        // router.get("/mrental/new", async (req,res) =>{

        //     res.render("newMovie")

        // });

        // router.get("/mrental/update",(req,res) =>{
        //     res.render("updateMovie")
        // });

            //default GET route
        //localhost:3015/mrental/admin/
        //@desc post/ movie database page
        //@path (server path)/mrental/admin/
        //@access admin jwt


        router.get("/mrental/admin/",adminAuth,(req,res) =>{

            res.render("admin-movie")

        });

        //html work in progress

        // router.get("/mrental/static", (req,res) => {
        //     //cwd is directory of whole project 

        //     console.log("connecting maybe....");
            

        //     const fileLoc = process.cwd() + `\\public\\home-static\\homePage\\home.html`;
            
        //     res.sendFile(fileLoc);
        // });




module.exports = router;