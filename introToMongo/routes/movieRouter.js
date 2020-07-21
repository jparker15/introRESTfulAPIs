const express = require("express"),
    //an instance of express Router class
    router = express.Router(),
        //MongoDB Schema
        Movie = require("../models/Movie");
        const findMovie = require("../middleware/findMovie");
        const adminAuth = require("../middleware/adminAuth");

        router.get("/adminTest",adminAuth, async(req,res)=>{
            try {
                res.json({message:"you are an admin!", admin_info: req.admin})
                
            } catch (err) {
                const errMsg = err.message || err
                console.error(`Error in Movie Router Test, \n Error: ${errMsg}`);
                res.status(500).json({ error: errMsg})
            }
        });

        //routes to make

        //add/delete movie inventory 

        //TODO make movie route admin/user only include midwares
    

//           //route handler 
//  router.get("/", (req,res) => {
    
//     // logs all movies in database
//     Movie.find((err,movies)=>{

//         if (err) {
//             return console.error(err);
//         }
//         console.log(movies);
//         res.json(movies)
        
//     })

// });


        //default GET route
        //localhost:3015/movie/all
        //@desc sends all movies as a json to DOM 
        //@path (server path)/movie/all
        //@access public

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

    //find a movie by id 
    //localhost:3015/movie/getmovie/:movieID
    //@desc sends one movie found by mongodb id as a json to DOM 
    //@path (server path)/movie/getmovie/:movieID
    //@access public
router.get("/getmovie/:movieID", findMovie, (req,res) => {
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
//my delete
// router.delete("/movie/delete/:movieID",deleteMovie, (req, res) =>{

//     try{

//         res.status(200).json({
//             status: 200,
//             message: "a movie was deleted",
//             movie: req.deletedMovie,
        
//         });

//     }
//     catch (err) {
//         console.log(err.message);

//         res.status(500).json({
//             status:500,
//             message: "An error has occured durring DELETE Request",
//             error: err.message
//         });
         
//     }
    
    
// });

    //code is async by default
    // declaring async allows the use of synchronus i.e await specifies a line as synchornus
router.delete("/delete/:movieID", findMovie, adminAuth, async (req,res) => {

    console.log(req.params);
    
    try {
                               //req param of route
                // req obj. params obj 
        //   let report = await Movie.findByIdAndDelete(req.params.movieID);
        //   console.log(report);

            await Movie.findByIdAndDelete(req.params.movieID);
                                  
        res.status(200).json({
            status:200,
            deleted_movie: req.foundMovie
        });
            
        
    } 
    catch (err) {     //
        console.error(`Error in HomeRouter` + err.message);
        
        res.status(500).json({
            status:500,
            message:err.message
        });

    }
});

router.patch("/patch/:movieID", findMovie, async (req,res) =>{
    
    const id = req.params.movieID;
    // keeps track of how many times a document has been updated
    let newVersion = req.foundMovie.__v + 1;

    req.body.__v = newVersion

    try{
        // doesn't not send updated document
       await Movie.updateOne({_id: id}, req.body);

      const updatedDocument = await Movie.findById(id);

       res.status(200).json({
           status: 200,

           new_document: updatedDocument,
           old_document: req.foundMovie

       })

    }catch (err) {     //
        console.error(`Error in HomeRouter` + err.message);
        
        res.status(500).json({
            status:500,
            message:err.message
        })

    }

})

// router.patch("/movie/:movieID",updateMovie,(req,res) =>{
//         try{
//             res.status(200).json({
//                 status: 200,
//                 message: "movie has been updated",
//                 movie: req.updatedMovie,
//             });
//         }
//         catch(err){
//             res.status(500).json({
//                 status:500,
//                 message: "an error occured during PATCH request",
//                 error: err.message
//             });
//         }
// });

//patch all movies to update inventory to match the model

router.patch(
    "/mpatch1",
    adminAuth,
    async (req,res) =>{

        try {
           const report = await Movie.updateMany(
               //empty obj as query means everything in that collection
                {},
                {
                    inventory: {
                        available: 1,
                        rented:[]
                    }
              }
            )

            res.json({
                allDoc: await Movie.find({}),
                report: report,
                message: "patch success"
            })
           
        } catch (error) {
            res.status(500).json({err: error.message || error})
        }

    }
)

router.post("/post", async (req,res) =>{
                        //object constructor
  

    // if everything is successful 
    try {

        // const newMovie = await new Movie(req.body);

        // await newMovie.save();

        const newMovie = await Movie.create(req.body);

        res.status(201).json({
            status: 201,
            new_movie: newMovie,
            message: "new movie added to database",
           
        });

    } catch (err) {

        console.log(err.message);

        res.status(500).json({

            status: 500,
            message: "an error has occured during POST request",
            error: err.message
    
        });
        

    }

     console.log(req.body);

    // res.send("loop prevention");


});


    module.exports = router;

