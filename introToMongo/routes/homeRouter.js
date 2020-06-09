
        //express requirement
 const express = require("express"),
        //instance of express' Router()
    router = express.Router(),
        //model for Movie requirement
    Movie = require("../models/Movie");

const findMovie = require("../middleware/findMovie");

const delMovie = require("../middleware/deleteMovie");

const updateMovie = require("../middleware/updateMovie");

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
            });
        }
    });

    //handler for delete request
// router.delete()

// Movie.findByIdAndDelete

// router.patch ()

// Movie.update({_id: id}, req.body)

    //req.params.reqparms
    // request movie by DB ID 
router.get("/movie/:movieID", findMovie, (req,res) => {
   try{ 
        res.status(200).json({
        status: 200,
        message: "a movie was found",
        movie: req.foundMovie,
        });
    }
    catch(err){
        console.log(err.message);

        res.status(500).json({
            status:500,
            message: "an error has occured",
            error:err.message
        });
        
    }
});

router.delete("/movie/:movieID",deleteMovie, (req, res) =>{

    try{

        res.status(200).json({
            status: 200,
            message: "a movie was deleted",
            movie: req.deletedMovie,
        
        });

    }
    catch (err) {
        console.log(err.message);

        res.status(500).json({
            status:500,
            message: "An error has occured durring DELETE Request",
            error: err.message
        });
         
    }
    
    
});

router.patch("/movie/:movieID",updateMovie,(req,res) =>{
        try{
            res.status(200).json({
                status: 200,
                message: "movie has been updated",
                movie: req.updatedMovie,
            });
        }
        catch(err){
            res.status(500).json({
                status:500,
                message: "an error occured during PATCH request",
                error: err.message
            });
        }
});

router.post("/", async (req,res) =>{
                        //object constructor
  

    // if everything is successful 
    try {

        const newMovie = await new Movie(req.body);

        await newMovie.save();

        res.status(201).json({
            status: 201,
            new_movie: newMovie,
            message: "new movie added to database",
           
        });

    } catch (err) {

        console.log(err.message);

        res.status(500).json({

            status: 500,
            message: "an error has occured durring POST request",
            error: err.message
    
        });
        

    }

     console.log(req.body);

    // res.send("loop prevention");


});



module.exports = router;