//loads express module - express makes a framework for routes
const express = require("express");
//creates an express app
const app = express();

const courses = [
    {id:1,name: "course1"},
    {id:2,name: "course2"},
    {id:3,name: "course3"},
    {id:4,name: "course4"},
    {id:5,name: "course5"},
]

app.get("/",(req,res) =>{

    res.send("Jello World");

});

app.get("/api/courses", (req,res) =>{

    res.send(courses);

});

app.get("/api/courses:id", (req,res) =>{

  const course =  courses.find (c => c.id === parseInt(req.params.id));

  if (!course) res.status(404).send("The course with given ID was not found");

  res.send(course)

});

// PORT/ $export PORT = *desired port* to set env.PORT from console
const port = process.env.PORT || 3000;

app.listen(port, () =>{

    console.log(`Listening Port ${port}`);
    
});