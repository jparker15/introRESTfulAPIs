const Movie = require("../models/Movie");

deleteMovie = async(req,res,next) => {

    try{
        const id = req.params.movieID;
          
    let deletedMovie = await Movie.findByIdAndDelete({_id: id});

    if (deletedMovie.length == 0){
        res.status(404).json ({
            status: 404,
            message: "No movie with given ID"
        })
    }

    else {

        deletedMovie = deletedMovie[0];

        req.deletedMovie = deletedMovie;

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


module.exports = deleteMovie;
