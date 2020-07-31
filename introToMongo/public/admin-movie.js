window.onload = () =>{

    submitUpdate.onclick = updateMovieReq;

    submitNew.onclick = submitMovieReq;

}

function submitMovieReq() {
    // compile submittion from form
    let reqBody = {};

    // loop through form element

    for (const iterator of newMovieForm) {

        console.log(iterator);
        reqBody[iterator.name] = iterator.value;
    }
    
    reqBody.inventory = {available: parseInt(reqBody.inventory) , rented:0}

    console.log(reqBody);
    

    
    // make xhr
    reqObj = {

        headers: {
            "Access-Control-Allow-Origin": "*",

            Accept: "application/json",

            "content-type": "application/json",
        },

        method: "POST",
        body: JSON.stringify(reqBody)
    }

    const endpoint = `${location.origin}/movie/post`;

    fetch(endpoint, reqObj)
    .then(rs => {return rs.json()})
    .then(response => {
        console.log("Response:" + response);
        
        // alert("YOU'VE MADE A NEW MOVIE");

        location = `${location.origin}`;
    })
}
function updateMovieReq() {

    if (idInput.value.trim() ===""||idInput.value.trim().length !=24){
        return alert("invalid ID ")
    }

    // console.log(movieID);
    
    

    let reqBody = {};

    for (const iterator of updateMovieForm) {

        const temp = iterator.value.trim()

       if (temp != "" && iterator.name != "id") {

        reqBody[iterator.name] = temp;
    
       }

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


    const endpoint = `${location.origin}/movie/patch/${idInput.value}`;

    fetch(endpoint,reqObj)
    .then(rs => {return rs.json()})
    .then(response => {
        console.log("Response:",response);
        
    })
    .catch(err => {console.log(`Error has occured, Err:${err}`);
    })

}