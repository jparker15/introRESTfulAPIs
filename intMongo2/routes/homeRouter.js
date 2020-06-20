const express = require("express"),

    router = express.Router(),

    GPU = require("../models/GPU")

    router.get("/", (req,res) =>{
        const fileLoc = process.cwd() + `\\static\\static.html`

        res.sendFile(fileLoc);
    });

    router.get("/all",async (req,res) =>{
       
        try {
            const allEntries = await GPU.find();

            res.status(200).json({
                status:200,
                message:"All entries were found",
                entries: allEntries
            });
        }
        catch(err){
            res.status(500).json({
                status:200,
                message:"error has occured homeRouter",
                error: err.message,
                full_report: err
            })
        }

    });

    router.post("/post", async (req,res) => {
        try{
            const newGPU = await new GPU(req.body);

            await newGPU.save();

            res.status(201).json({
                status:201,
                new_gpu: newGPU,
                message: "successfully added to database"
            });
        }

        catch(err){
            console.log(err.message);
            
            res.status(500).json({

                status: 500,
                message: "an error has occured during POST request",
                error: err.message
        
            });
            
        }
        console.log(req.body);
        
    });

module.exports = router;