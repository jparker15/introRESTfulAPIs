//loads express module - express makes a framework for routes
const express = require("express");
//creates an express app
const app = express();

app.get("/",(req,res) =>{

    res.send("Jello World");

});

app.get("/api/courses", (req,res) =>{

    res.send([1,2,3,4,5]);

});

app.get("/api/posts/:year/:month", (req,res) =>{

    res.send(req.query);

});

// PORT/ $export PORT = *desired port* to set env.PORT from console
const port = process.env.PORT || 3000;

app.listen(port, () =>{

    console.log(`Listening Port ${port}`);
    
});