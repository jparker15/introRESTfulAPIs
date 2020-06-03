
        //express requirement
 const express = require("express"),
        //instance of express' Router()
    router = express.Router(),
        //model for Movie requirement
    Movie = require("../models/Movie");

     //route handler 
 router.get("/", (req,res) => {
    
    res.json({
        message:"MESSAGE",
    });

});

router.post("/", async (req,res) =>{
                        //object constructor
  

    // if everything is successful 
    try {

        const newMovie = await new Movie(req.body);

        await newMovie.save()

        res.json({
            status: 201,
            new_movie: newMovie,
            message: "new movie added to database",
           
})

    } catch (err) {

        console.log(err.message);

        res.json({

            message: "an error has occured durring POST request",
            error: err.message,
            status: 500

        })
        

    }

     console.log(req.body);

    // res.send("loop prevention");


});



module.exports = router;