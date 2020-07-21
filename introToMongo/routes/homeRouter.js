
        //express requirement
 const express = require("express"),
        //instance of express' Router()
    router = express.Router(),
        //model for Movie requirement
    Movie = require("../models/Movie"),

    adminAuth = require("../middleware/adminAuth")



        //default GET route
        //localhost:3015/
        //@desc post/ home page 
        //@path (server path)/
        //@access public
        router.get("/", (req,res) =>{
            //expected query properties: "msg" and "title"

                //location.origin/?msg="message"&title="new title"

                    //destructured  object

                      // req.query = {title: "", msg: ""}
                        //object destructured 
                    // const{msg,title} = req.query || mgs = req.query.msg ; title= req.query.title

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

        //default GET route
        //localhost:3015/mrental
        //@desc post/ movie database page
        //@path (server path)/mrental
        //@access public

        router.get("/mrental", async (req,res) =>{
                                            //"nested object": {mongodb query selector:}
            const allMovies = await Movie.find({"inventory.available":{$gte:1}}),//matches values that are greater then or equal to a specified value

                clientMsg = `Number of Movies:` + allMovies.length; 

            res.render("home", {all_movies: allMovies, message: clientMsg})
        });


        // router.get("/mrental/new", async (req,res) =>{

        //     res.render("newMovie")

        // });

        // router.get("/mrental/update",(req,res) =>{
        //     res.render("updateMovie")
        // });

            //default GET route
        //localhost:3015/mrental/admin/:key
        //@desc post/ movie database page
        //@path (server path)/mrental/admin/:key
        //@access admin


        router.get("/mrental/admin/",adminAuth,(req,res) =>{

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