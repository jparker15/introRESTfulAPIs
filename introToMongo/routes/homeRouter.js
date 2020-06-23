
        //express requirement
 const express = require("express"),
        //instance of express' Router()
    router = express.Router(),
        //model for Movie requirement
    Movie = require("../models/Movie"),

    adminAuthrzr = require("../middleware/adminAuthrzr")


        //pug 
        router.get("/", (req,res) =>{
            //expected query properties: "msg" and "title"

                //location.origin/?msg="message"&title="new title"

                    //deconstructed object

                    //expected query in route
            const {msg,title} = req.query;

            console.log(msg,title);


            res.render("test",{

                message:msg || "default msg",

                titleVar:title || "default title"
            
            });
            
        });

        // router.get("/:request params/:reqParams",(req,res) =>{
        //     location = `${location.origin}/mrental`
        //     res.send("yah")
        // })

        router.get("/mrental", async (req,res) =>{
            const allMovies = await Movie.find({}),

                clientMsg = `Number of Movies:` + allMovies.length; 

            res.render("home", {all_movies: allMovies, message: clientMsg} )
        });


        // router.get("/mrental/new", async (req,res) =>{

        //     res.render("newMovie")

        // });

        // router.get("/mrental/update",(req,res) =>{
        //     res.render("updateMovie")
        // });

        router.get("/mrental/admin/:key",adminAuthrzr,(req,res) =>{

            res.render("admin-movie")

        });

        //html work in progress

        router.get("/mrental/static", (req,res) => {
            //cwd is directory of whole project 

            console.log("connecting maybe....");
            

            const fileLoc = process.cwd() + `\\public\\home-static\\homePage\\home.html`;
            
            res.sendFile(fileLoc);
        });




module.exports = router;