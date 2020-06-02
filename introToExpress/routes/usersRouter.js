const express = require("express"),

    router = express.Router(),

    fs = require("fs");

    router.get("/", (req,res) => {


        res.send(`users\'s Page`)


        
    });
    // test GET Req
    router.get("/test", (req,res) =>{

         
        let textFile = process.cwd() + "\\database\\database.txt",

            parsedData = fs.readFileSync(textFile, "utf8");

            console.log(parsedData);
            
            if (parsedData[0] != "{" || parsedData[parsedData.length - 1]!= "}") {
                parsedData = "{}";
            }

            parsedData = JSON.parse(parsedData);

            let allUsers = "";

            for (let i = 0; i < parsedData.user.length; i++) {
                
                for (const key in parsedData.user[i]) {
                    
                    const value = parsedData.user[i][key];
                    
                    allUsers += `${key} - ${value}`;

                }

                
                
            }

            res.send(allUsers);

    })
    //post a new user
    router.post("/",(req,res) =>{
        
        let textFile = process.cwd() + "\\database\\database.txt",

            parsedData = fs.readFileSync(textFile, "utf8");

            console.log(parsedData);
            
            if (parsedData[0] != "{" || parsedData[parsedData.lengt - 1]!= "}") {
                parsedData = "{}";
            }

            parsedData = JSON.parse(parsedData);

            if (parsedData.user == undefined){

                parsedData.user = [req.body];
               
            }
            else{
                parsedData.user.push(req.body);
            } 

            parsedData = JSON.stringify(parsedData);

            fs.writeFileSync(textFile,parsedData);
            
            res.json({

            message: `successful new user`,
            status: 200,
            new_user: req.body

        });
    


    
    });

module.exports = router;