window.onload = () =>{

    submitMovie.onclick = updateMovieReq;

}

function updateMovieReq() {

    let _id;

    // console.log(movieID);
    
    

    let reqBody = {};

    for (const iterator of updateMovieForm) {

        if(iterator.name == "movieID"){
            //console.log(iterator.value);
             _id = iterator.value;
             
         }

        reqBody[iterator.name] = iterator.value;

        
    }

    reqObj ={
        
        headers: {
        "Access-Control-Allow-Origin": "*",

        Accept: "application/json",

        "content-type": "application/json",
        },

        method: "PATCH",

        body: JSON.stringify(reqBody)

    }


    const endpoint = `${location.origin}/movie/patch/${_id}`;

    fetch(endpoint,reqObj)
    .then(rs => {return rs.json()})
    .then(response => {
        console.log("Response:",response);
        
    })
    .catch(err => {console.log(`Error has occured, Err:${err}`);
    })

}