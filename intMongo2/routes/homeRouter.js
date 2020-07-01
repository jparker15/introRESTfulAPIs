const express = require("express"),

    router = express.Router(),

    GPU = require("../models/GPU"),

    findID = require("../middleware/findID");

    // router.get("/", (req,res) =>{
    //     const fileLoc = process.cwd() + `\\static\\static.html`

    //     res.sendFile(fileLoc);
    // });

    router.get("/",async (req,res) =>{

       const allGPUs = await GPU.find({});
       
       res.render("home",{
          
       })

    });

    router.get("/database",async (req,res)=>{

        const allGPUs = await GPU.find({}),

        clientMsg = "Number of GPUs: " + allGPUs.length;

        res.render("database", {

            message:clientMsg,
            entries:allGPUs

        })

    })

    router.get("/postgpu", async (req,res) => {
        
        res.render("postGPU");

    });

   

  

    

    

   
module.exports = router;