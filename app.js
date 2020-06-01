//loads express module - express makes a framework for routes
const express = require("express"),

    morgan = require("morgan"),

    reqBodyLog = require("./middleware/reqBodyLog");

//creates an express app/ an instance of Express
const app = express();
//__dirname - 
//console.log(__dirname + `\static`);

// use express.static everytime a request is made 
app.use(express.static(__dirname + "/static"));

// console log reqs basic summary
app.use(morgan("dev"));

app.use(express.json());

const homeRouter = require("./routes/homeRouter");

app.use("/", homeRouter);

const userRouter = require("./routes/usersRouter");

app.use("/users", userRouter);

const movieRouter = require("./routes/movieRouter");

app.use("/movies", movieRouter);

let database = {
    movies:[ 
        
                                                                                                                                                                                                //
        {title: 'Akira',release: 1988, available: true, img: 'https://upload.wikimedia.org/wikipedia/en/5/5d/AKIRA_%281988_poster%29.jpg', link:"https://en.wikipedia.org/wiki/Akira_(1988_film)", inventory:[3,4] }, 
        {title: 'Black Dynamite', release: 2009, available: true, img: 'https://upload.wikimedia.org/wikipedia/en/8/84/Black_dynamite_poster.jpg', link:"https://en.wikipedia.org/wiki/Black_Dynamite", inventory:[3,4]}, 
        {title: 'Belly',          release: 1998, available: true, img: 'https://upload.wikimedia.org/wikipedia/en/d/db/Belly_poster.jpg', link:"https://en.wikipedia.org/wiki/Belly_(film)", inventory:[3,4]}, 
        {title: 'Paid in Full',       release: 2002, available: true, img: 'https://upload.wikimedia.org/wikipedia/en/7/72/Paidinfullposter.jpg', link:"https://en.wikipedia.org/wiki/Paid_in_Full_(2002_film)", inventory:[3,4] }, 
        {title: 'Pulp Fiction',             release: 1994, available: true, img: 'https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg', link:"https://en.wikipedia.org/wiki/Pulp_Fiction", inventory:[3,4] }, 
        {title: 'Payback',       release: 1999, available: false, img: 'https://upload.wikimedia.org/wikipedia/en/3/31/PaybackPoster.jpg', link:"https://https://en.wikipedia.org/wiki/Payback_(1999_film).com/", inventory:[3,4] },
        {title: 'The Sting',            release: 1973, available: true, img: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/The_Sting_%281973_alt_poster%29.jpeg', link:"https://en.wikipedia.org/wiki/The_Sting", inventory:[3,4] }
    
    ],
    
    users: []
}

// app.get("/",(req,res) =>{

//     res.sendFile(__dirname + `/static/home.html`);

// });


// app.post("/users",reqBodyLog,(req,res) =>{
     
//     res.json(req.body);


// });




// PORT/ $export PORT = *desired port* to set env.PORT from console
const port = process.env.PORT || 3000;

app.listen(port, () =>{

    console.log(`Listening Port ${port}`);
    
});