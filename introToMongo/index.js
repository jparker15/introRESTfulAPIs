require("dotenv").config();

const express = require("express"),

    server = express(),

    morgan = require("morgan"),

    mongoose = require("mongoose"),

    port = process.env.PORT || 3001,

    newObj = {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true},

    connectionURI = process.env.MONGO;

    const homeRouter = require("./routes/homeRouter");

    // some midware needs to go before others
    server.use(express.json());

    server.use(morgan("dev"));
    //express.json and morgan must be called before expressInstance.use

    server.use("/", homeRouter);

  

   mongoose.connect(connectionURI,newObj ,() =>{

  
    console.log("The server is connected to the database");
    

   });
   // event listener for error on connection
   mongoose.connection.on("error", (err) =>{

       console.log(`Error occured trying to connect to MongoDB,\nError:\n${err}`);
       
   })

   mongoose.connection.on("connected", () =>{

       console.log(`the server is attempting to connect to the database...`);
       
   })

 
    // route listener
server.listen( port, () => {

    console.log(`server listening on port: ${port}`);
    
})

    
