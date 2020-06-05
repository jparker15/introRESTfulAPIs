const Movie = require("../models/Movie");

findMovie = async(req,res,next) => {

    try{
        const id = req.params.movieID;
          
    let foundMovie = await Movie.find({_id: id});

    if (foundMovie.length == 0){
        res.status(404).json ({
            status: 404,
            message: "No movie with given ID"
        })
    }

    else {

        foundMovie = foundMovie[0];

        req.foundMovie = foundMovie;

        next()
    }

    }
    
    catch(err) {

        console.log(err.message);
        

        res.status(500).json({
            status: 500,
            message: err.message,
            full_report: err
        })
    }
    
    
}


module.exports = findMovie;
