
        //express requirement
 const express = require("express"),
        //instance of express' Router()
    router = express.Router(),
        //model for Movie requirement
    Movie = require("../models/Movie")


        //pug 
        // router.get("/", (req,res) =>{

        //     res.render("test",{message:"Test msg",titleVar: "Title tester"} )
            
        // });

        router.get("/mrental", async (req,res) =>{
            const allMovies = await Movie.find({}),

                clientMsg = `Number of Movies:` + allMovies.length; 

            res.render("home", {all_movies: allMovies, message: clientMsg} )
        })


        router.get("/mrental/new", async (req,res) =>{

            res.render("newMovie")

        })

        //html work in progress

        router.get("/mrental/static", (req,res) => {
            //cwd is directory of whole project 

            console.log("connecting maybe....");
            

            const fileLoc = process.cwd() + `\\public\\home-static\\homePage\\home.html`;
            
            res.sendFile(fileLoc);
        });




module.exports = router;