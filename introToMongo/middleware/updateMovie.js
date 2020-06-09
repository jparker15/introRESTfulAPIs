const Movie = require("../models/Movie");

updateMovie = async (req,res,next) => {
    try {
        const id = req.params.movieID;

        let update = await Movie.update({_id: id}, req.body);

        if(update.length == 0){
            res.status(404).json({status:404,message:"No movie found with that ID"})
        }
        update = update[0];

        req.updatedMovie = update;
        next();
    }
    catch(err){
        console.log(err.message);

        res.status(500).json({status:500,message:err.message,full_report:err})
        
    }
}

module.exports = updateMovie