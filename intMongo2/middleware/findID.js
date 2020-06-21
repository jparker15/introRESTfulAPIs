const GPU = require("../models/GPU");

findID = async(req,res,next) => {
    
    try{
        //ID that is sent in request URL Path Param
        const id = req.params.id;

        let foundID = await GPU.find({_id: id});

        if (foundID.length == 0){
            res.status(404).json({
                status:404,
                message: "Nothing matching that given ID"
            })
        }
        else{
            foundID = foundID[0];

            req.foundID = foundID;

            next()
        }
    }
    catch(err){
        console.log(err.message);

        res.status(500).json({
            status:500,
            message: err.message,
            full_report: err
        })
        
    }

}

module.exports = findID;