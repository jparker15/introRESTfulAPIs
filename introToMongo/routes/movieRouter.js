        const express = require("express"),
    //an instance of express Router class
        router = express.Router(),
        //MongoDB Schema
        Movie = require("../models/Movie");

        const newError = require("../utils/newError");

        const findMovie = require("../middleware/findMovie");
        const adminAuth = require("../middleware/adminAuth");
        const userAuth = require("../middleware/userAuth");


        // router.get("/adminTest",adminAuth, async(req,res)=>{
        //     try {
        //         res.json({message:"you are an admin!", admin_info: req.admin})
                
        //     } catch (err) {
        //         const errMsg = err.message || err
        //         console.error(`Error in Movie Router Test, \n Error: ${errMsg}`);
        //         res.status(500).json({ error: errMsg})
        //     }
        // });

        //routes to make

        //add/delete movie inventory

        //localhost:3015/movie/addinv
        //@desc adds given inventory to selected movie  
        //@path (server path)/movie/addinv
        //@access admin

        router.patch(
            "/updinv",
            adminAuth,
            async (req,res) =>{

                const {movieId, inc, isIncrease = true} = req.body; // const movieId = req.body.movieId 
                     
                const adminLvl = req.admin.adminLvl;
                
                try {
                        // validating movie id 
                    if(typeof movieId !== "string" || movieId.length !== 24) throw newError ("Movie ID Is Invalid",400);

                    if(typeof inc !== "number" || inc <= 0) throw newError("Increment Value Invalid", 400);

                    let limit;

                    switch (adminLvl) {
                        case 1 :
                            limit = 1
                            break;
                        case 2 :
                            limit = 10
                            break;
                        case 3 :
                            limit = 100
                            break;
                    }

                    if (inc > limit) throw newError ((`Not Authorized to Increase by ${inc} for Admin Level ${adminLvl}`,401));
                    // if (
                    //     (adminLvl === 1 && inc > 1) 
                    //     ||
                    //     (adminLvl === 2 && inc > 10)
                    //     ||
                    //     (adminLvl == 3 && inc > 100)
                        
                    // ) throw newError (`Not Authorized to Increase by ${inc}`,401);

                    const increment = isIncrease === true ? inc : -inc;
        
                    const found = await Movie.findById(movieId);
                    
                    if (found === null) throw newError ("Movie ID does not exist", 404);

                    if (found.inventory.available + increment < 0) throw newError ("Inventory can not be below 0",400)

                    const updatedMovie = await Movie.findOneAndUpdate(
                        {_id:movieId},
                        {$inc:{"inventory.available":increment}},
                        {new:1}
                    )

                    res.json({message: "Inventory Has Been Updated",movie:updatedMovie});

                } catch (err) {
                                //setting default
                    const {message:msg = err, code = 500} = err; 

                    res.status(code).json({"error":msg});
                    /* const errMsg = err.message||err;
                    // const errStat = err.status|| 500;
                    // res.status(errStat).json({error:errMsg});*/
                }
            }
        )


        // //localhost:3015/movie/addinv
        // //@desc adds given inventory to selected movie  
        // //@path (server path)/movie/addinv
        // //@access admin
        // router.patch(
        //     "/addinv",
        //     adminAuth,
        //     async (req,res) =>{

        //         try {
        //             // if(req.admin.adminProp.adminLvl <= 1) throw newError("not authorized",401);

        //             //TODO
        //             //validate "movieId"(check length) and "inc"(check admin priv. admin lvl 1 = no privilage, lvl 2 = add 10 of inventory, lvl 3 = add 100 of inventory ) in req.body, confirm their types
                    
        //             const updatedMovie = await Movie.findByIdAndUpdate(
        //                 req.body.movieId,
        //                 {$inc: {"inventory.available": req.body.inc}},
        //                 {new:1}
        //                 )
        //             res.json({"movie":updatedMovie});

        //         } catch (err) {
        //             const errMsg = err.message || err;
        //             const errStat = err.status || 500;

        //             res.status(errStat).json({
        //                 error: errMsg
        //             })
        //         }
                

        //     }

        // )
        
        // //localhost:3015/movie/subinv
        // //@desc subtracts given inventory to selected movie  
        // //@path (server path)/movie/addinv
        // //@access admin

        // router.patch(
        //     "/subinv",
        //     adminAuth,
        //     async (req,res) =>{
        //         try{
        //             const updatedMovie = await Movie.findByIdAndUpdate(
        //                 req.body.movieId, //value of _id to query
        //                 {$inc: {"inventory.available":req.body.dec}},// $inc updates avaiable by a negative number
        //                 {new:1}
        //             )
        //             res.json({"movie":updatedMovie});
        //         }
        //         catch(err){
        //             const errMsg = err.message || err;
        //             const errStat = err.status || 500;

        //             res.status(errStat).json({error:errMsg});
        //         }
        //     }
        // )
        
    

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
        //@access user

    router.get(
        "/all",
        userAuth,
        async (req,res) => {

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
            const errMsg = err.message || err;
            const errStat = err.status || 500;

            res.status(errStat).json({
                error: errMsg
            })
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
router.get(
    "/getmovie/:movieID",
    findMovie,
    (req,res) => {
   try{ 
        res.status(200).json({
        status: 200,
        message: "a movie was found",
        movie: req.foundMovie,
        });
    }
    catch(err){
        
        const errMsg = err.message || err;
        const errStat = err.status || 500;

        res.status(errStat).json({
            error: errMsg
        })
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
router.delete(
    "/delete/:movieID", 
    findMovie, 
    adminAuth, 
    async (req,res) => {

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
        
        const errMsg = err.message || err;
        const errStat = err.status || 500;

        res.status(errStat).json({error:errMsg});

    }
});

router.patch(
    "/patch/:movieID",
    adminAuth,
    findMovie,
    async (req,res) =>{
    
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
        
        const errMsg = err.message || err;
        const errStat = err.status || 500;

        res.status(errStat).json({error:errMsg});

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
           
        } catch (err) {
            const errMsg = err.message || err;
            const errStat = err.status || 500;

            res.status(errStat).json({error:errMsg});
        }

    }
)

router.post(
    "/post",
    adminAuth,
    async (req,res) =>{
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

        const errMsg = err.message || err;
        const errStat = err.status || 500;

        res.status(errStat).json({error:errMsg});
        

    }

    // res.send("loop prevention");


});


    module.exports = router;

