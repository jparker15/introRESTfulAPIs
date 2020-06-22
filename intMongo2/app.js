require("dotenv").config(); 

const express = require("express"),

    mongoose = require("mongoose"),

    morgan = require("morgan"),
    
    home = require("./routes/homeRouter"),

    connectionURI = process.env.MONGO;

    const port = process.env.PORT || 5404;

    app = express();
    
    app.use(express.json());
    
    app.use(morgan("dev"));

        //specify default engine and provide extension
    app.set("view engine", "pug");

    app.use(express.static("./static"));

    app.use("/", home);
    
    newObj = {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true},


    mongoose.connect(connectionURI,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, ()=> {
        console.log("App is connected to MongoDB");
        
    });

    mongoose.connection.on("error", (err) =>{
        console.log(`Error occured trying to connect to MongoDB,\nError:\n${err}`);
        
    });

    mongoose.connection.on("connected", () =>{
        console.log(`the server is attempting to connect to the database...`);
    });

    
    app.listen(port, () =>{
    
        console.log(`Listening Port ${port}`);
        
    });