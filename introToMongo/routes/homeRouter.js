
        //express requirement
const express = require("express"),
        //instance of express' Router()
    router = express.Router(),
        //model for Movie requirement
    Movie = require("../models/Movie"),

    User = require("../models/User"),

    adminAuth = require("../middleware/adminAuth"),

    userAuth = require("../middleware/userAuth"),

    extractCookie = require("../middleware/extractCookie"),

    isAdmin = require("../middleware/isAdmin");

        // router.get("/:request params/:reqParams",(req,res) =>{
        //     location = `${location.origin}/mrental`
        //     res.send("yah")
        // })

        router.get("/login",(req,res) =>{
            res.render("login");
        })

        router.get("/register", (req,res) =>{
            res.render("register");
        })

        //default GET route
        //localhost:3015/mrental
        //@desc post/ movie database page
        //@path (server path)/
        //@access users 

        router.get("/",
                extractCookie,
                isAdmin,
                async (req,res) =>{

                const loggedIn = req.authKey != undefined;

                // const isAdmin = req.admin != undefined;

                                            //"nested object": {mongodb query selector:}
                const allMovies = await Movie.find({"inventory.available":{$gte:1}}),//matches values that are greater then or equal to a specified value

                clientMsg = `Number of Movies:` + allMovies.length; 

                const admin = req.isAdmin || false;

                const renderObj =  {
                    all_movies: allMovies,
                    message: clientMsg,
                    isLoggedIn: loggedIn,
                    isAdmin: admin
                };

            res.render("home",renderObj);  
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


        router.get(
            "/admin/",
            extractCookie,
            adminAuth,(req,res) =>{

            res.render("admin-movie")

        });

        router.get(
            "/profiles/:username",
            extractCookie,
            isAdmin,
            async (req,res) =>{

                const profileOwner = await User.findOne({username: req.params.username});

                if(profileOwner === null){
                   return res.redirect("/")
                }
                
                const viewingUser = await User.findById(req.userId);

                // const usersAll = await User.find()
                

                    // res.json({"profile":profileOwner,"viewing":viewingOwner,users:usersAll});
                const renderOpt = {
                    proUsername:profileOwner.username,
                    rentingMovies:profileOwner.rentedMovies,
                    viewerRented: viewingUser === null ? [] : viewingUser.rentedMovies, 
                }
                
                res.render("profile",renderOpt);
               

            }
        )

        //html work in progress

        // router.get("/mrental/static", (req,res) => {
        //     //cwd is directory of whole project 

        //     console.log("connecting maybe....");
            

        //     const fileLoc = process.cwd() + `\\public\\home-static\\homePage\\home.html`;
            
        //     res.sendFile(fileLoc);
        // });




module.exports = router;