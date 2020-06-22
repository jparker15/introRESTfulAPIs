const express = require("express"),

    router = express.Router(),

    GPU = require("../models/GPU"),

    findID = require("../middleware/findID");

    // router.get("/", (req,res) =>{
    //     const fileLoc = process.cwd() + `\\static\\static.html`

    //     res.sendFile(fileLoc);
    // });

    router.get("/",async (req,res) =>{
       
        const allGPUs = await GPU.find({}),

              clientMsg = "Number of GPUs:" + allGPUs.length;

        res.render("home", {
            message:clientMsg,
            entries:allGPUs

        })

    });

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

    router.get("/post", async (req,res) => {
        
        res.render("postGPU");

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
    
module.exports = router;