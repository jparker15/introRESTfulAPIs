const express = require("express");

require("dotenv").config();

const port = process.env.PORT;

console.log(`A ${process.env.AUTHOR} Joint`);


let database = [
    
    {title: 'Akira',release: 1988, available: true, img: 'https://upload.wikimedia.org/wikipedia/en/5/5d/AKIRA_%281988_poster%29.jpg', link:"https://en.wikipedia.org/wiki/Akira_(1988_film)", inventory:[3,4] }, 
    {title: 'Black Dynamite', release: 2009, available: true, img: 'https://upload.wikimedia.org/wikipedia/en/8/84/Black_dynamite_poster.jpg', link:"https://en.wikipedia.org/wiki/Black_Dynamite", inventory:[3,4]}, 
    {title: 'Belly',          release: 1998, available: true, img: 'https://upload.wikimedia.org/wikipedia/en/d/db/Belly_poster.jpg', link:"https://en.wikipedia.org/wiki/Belly_(film)", inventory:[3,4]}, 
    {title: 'Paid in Full',       release: 2002, available: true, img: 'https://upload.wikimedia.org/wikipedia/en/7/72/Paidinfullposter.jpg', link:"https://en.wikipedia.org/wiki/Paid_in_Full_(2002_film)", inventory:[3,4] }, 
    {title: 'Pulp Fiction',             release: 1994, available: true, img: 'https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg', link:"https://en.wikipedia.org/wiki/Pulp_Fiction", inventory:[3,4] }, 
    {title: 'Payback', release: 1999, available: false, img: 'https://upload.wikimedia.org/wikipedia/en/3/31/PaybackPoster.jpg', link:"https://https://en.wikipedia.org/wiki/Payback_(1999_film).com/", inventory:[3,4] },
    {title: 'The Sting',release: 1973, available: true, img: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/The_Sting_%281973_alt_poster%29.jpeg', link:"https://en.wikipedia.org/wiki/The_Sting", inventory:[3,4] }

];

const app = express();
    //  "/" = root route 
app.get ("/", (req,res) =>{

   res.json({message: "Welcome to my Home Page"});

    // res.send('bye');
    
    // res.sendFile();

})

app.get("/about", (req,res) =>{
    res.send("Learn more About Me!");
})

app.get("/movies", (req,res) => {
    res.json({
        message: "All movies in this database",
        allMovies: database
    })
})

app.get("/query", (req,res) => {

    const q = req.query,
    //query parameters
    name = q.name,
    saying = q.saying,
    color = q.color;


    console.log(req.query);

    res.json({
        status:200,
        message: `A nonbinary being named ${name}'s fav color is ${color}, their favorite saying is ${saying}.`

    })
    
})

        // :indicates its gonna a request parameter
app.get("/movies/:id", (req,res) => {

    console.log(req.params.id);

    const moviePick = req.params.id;

    if (isNaN(parseInt(moviePick)) ){

        res.json({
            status: 404,
            message: "Selection must be a number between 1 and " + database.length
        })

    }

    else if (moviePick > 0 && moviePick < database.length) {

        console.log(req.params);
        

        res.json({
            status: 200,
            message:`${database[moviePick - 1].title} has been selected`,
            movie: database[moviePick - 1],
        });
    }

    else{
        // if moviePick is a number but not in the database

        res.json({
            status: 404,
            message: `${moviePick} is not in the valid range of movies`
        });
    }
    

    // res.json({
    //     message: "All movies in this database",
    //     allMovies: database
    // })W
})

app.listen(port, () => {

    console.log(`App Listening on Port ${port}`);
    
})