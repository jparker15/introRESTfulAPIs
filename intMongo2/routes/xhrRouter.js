const express = require("express"),
      router = express(),
      GPU = require("../models/GPU");


    router.delete("/delete/:id",findID, async (req,res) =>{
        try {
            await GPU.findByIdAndDelete(req.params.id);

            res.status(200).json({
                status:200,
                deleted: req.foundID
            })
            
        }
        catch(err){
            console.log("error in homeRouter"+err.message);
            
            res.status(500).json({
                status:500,
                message: "an error occured during DELETE request",
                error: err.message
            });
        }
        console.log(req.body);
        
    });

    router.post("/post", async (req,res) => {

            try{
                const newGPU = await GPU.create(req.body);
                
                res.status(201).json({
                    status:201,
                    new_gpu: newGPU,
                    message: "new GPU added to database"
                });
            }
            catch (err) {
    
                    console.log(err.message);
                    
                res.status(500).json({
                    status:500,
                    message:"an error has occured during POST request",
                    error:err.message
                })
            }
            console.log(req.body);
            
    
    });


    router.patch("/update/:id",findID, async (res,req) =>{

            try {
                await GPU.findByIdAndUpdate(req.params.id);

                res.status(200).json({
                    status:200,
                    updated: req.foundID
                })
            }

            catch (err) {

                res.status(500).json({
                    status:500,
                    message:"an error occured during PATCH request",
                    error: err.message
                })

            }

    })

    module.exports = router;