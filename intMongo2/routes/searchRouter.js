const express = require("express"),

      router = express.Router(),

      GPU = require("../models/GPU");

router.get("/:query", async (req,res) =>{
    const q = req.params.query;

    try{
       const allGPUs = await GPU.find({
           //value exactly matches must be entire string
           $or:[{prefix:q},{generation:q},{perfTier:q},{codeName:q}]
       });

       

       
    }
    catch (err){
        res.send(err.message)
    }
})

module.exports = router;
