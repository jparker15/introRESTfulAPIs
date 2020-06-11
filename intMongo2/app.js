require("dotenv").config(); 

const express = require("express"),
    mongoose = require("mongoose"),
    morgan = require("morgan"),
    home = require("./routes/homeRouter")

    app = express();

    app.use(morgan("dev"));

    app.use("/", home);




    const port = process.env.PORT || 5404;
    app.listen(port, () =>{
    
        console.log(`Listening Port ${port}`);
        
    });