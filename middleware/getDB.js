const fs = require("fs"); // file system allowes to read and write files 

function getDB(req,res,next){

    const textFile = process.cwd() + "/database/database.txt", // location (path) of database

          rawData = fs.readFileSync(textFile, "utf8"), // returns contents of path (textFile) , "enconding" 

          parsedData  = JSON.parse(rawData); // parsify contents creating a JS value or object

          
    req.databaseData = parsedData; // set req.property to parsified database.text

    next(); //call next function
}


module.exports = getDB; // export middleware 