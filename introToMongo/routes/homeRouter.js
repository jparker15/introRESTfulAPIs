
        //express requirement
 const express = require("express"),
        //instance of express' Router()
    router = express.Router(),
        //model for Movie requirement
    Movie = require("../models/Movie");

const findMovie = require("../middleware/findMovie");

     //route handler 
 router.get("/", (req,res) => {
    
    // logs all movies in database
    Movie.find((err,movies)=>{

        if (err) {
            return console.error(err);
        }
        console.log(movies);
        res.json(movies)
        
    })

});

    // request all movies
    router.get("/all", async (req,res) => {

        try{            
           const allMovies = await Movie.find();
    
           let Json;
    
           if (allMovies.length == 0 ){
               Json = {
                status: 204,
                message: "No movies currently in the DB"
    
               }
           }
           else {
               Json = {
            
                    status: 200,
                    message: "All movies were found",
                    movies: allMovies
               
               }
           }
    
           res.status(200).json(Json)
        }
        catch (err) {
            res.status(500).json({
                status:500,
                message: "error occured",
                error: err.message,
                full_report: err
            })
        }
    })

    //handler for delete request
// router.delete()

// Movie.findByIdAndDelete

// router.patch ()

// Movie.update({_id: id}, req.body)

    //req.params.reqparms
    // request movie by DB ID 
router.get("/movie/:movieID", findMovie, (req,res) => {
    res.status(200).json({
        status: 200,
        message: "a movie was found",
        movie: req.foundMovie,
        
    })
})


router.post("/", async (req,res) =>{
                        //object constructor
  

    // if everything is successful 
    try {

        const newMovie = await new Movie(req.body);

        await newMovie.save()

        res.status(201).json({
            status: 201,
            new_movie: newMovie,
            message: "new movie added to database",
           
})

    } catch (err) {

        console.log(err.message);

        res.status(500).json({

            message: "an error has occured durring POST request",
            error: err.message,
            status: 500

        })
        

    }

     console.log(req.body);

    // res.send("loop prevention");


});



module.exports = router;