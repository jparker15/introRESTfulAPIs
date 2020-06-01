//   Things router/router files need

    //require express




    const express = require("express"),

    router = express.Router(),

    fs = require("fs"),

    getDB = require("../middleware/getDB");

    const textFile = process.cwd() + "\\database\\moviesDB.txt";

    router.get("/", getDB, (req, res) => {

        const allMovies = req.databaseData.movies;

        console.log(req.databaseData);
        

        res.json({
            message:"all movies",
            movies: allMovies
        });

    });

    router.post("/", getDB , validNewMov, (req,res) =>{

        //access req body & validate
        console.log(req.body);

        req.databaseData.movies.push(req.body);

        req.databaseData = JSON.stringify(req.databaseData);

        fs.writeFileSync(textFile,req.databaseData);

        res.status(200).json({
            status: 200,
            message: "posted successfully",
            new_movie: req.body
        })
        

    });

    router.delete("/", getDB, (req,res) => {

        console.log(req.body);
         
        res.json(req.body);
    })

    router.patch("/",getDB, (req,res) => {

        

    })

    // midware functions 

    function validNewMov (req, res, next) {
        //get the new movie in an JS object
    
        console.log(req.body);
    
        //check for title, release, available, imdbLink, img
    
        const { title: t, release: r, available, link, img, inventory } = req.body,
    
        newMovObj = {
            title: t,
            release: r,
            available: available,
            img: img,
            link: link,
            inventory: inventory
        },
        
        bodyLen = Object.keys(req.body).length,
    
        newMovObjLength = Object.keys(newMovObj).length;
    
        if (bodyLen < newMovObjLength || bodyLen > newMovObjLength + 20) {
    
            res.status(400).json({
                status: 400,
                message: 'Bad Request, there were too few or too many key/value pairs in the request body',
                your_body_length: bodyLen,
                required_body_length: newMovObjLength
            });
    
            return
            
        }
    
        let missingKeys = [];
    
        for (const k in newMovObj) {
            if (newMovObj[k] == undefined ) {
               
                missingKeys.push(k)
    
            }
        }
    
        if (missingKeys.length > 0) {
            
            res.status(400).json({
                status: 400,
                error: 'Missing Keys',
                message: `The request body was missing the keys; ${missingKeys}`
            })
            return 
        }
    
        req.body = newMovObj;
    
        next()
    }
    
    

    module.exports = router;