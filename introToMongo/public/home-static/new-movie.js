window.onload = () => {
    
    submitMovie.onclick = submitMovieReq;

}

function submitMovieReq() {
    // compile submittion from form
    let reqBody = {};

    // loop through form element

    for (const iterator of newMovieForm) {

        console.log(iterator);
        reqBody[iterator.name] = iterator.value;
    }
    
    reqBody.inventory = {available: reqBody.inventory, rented:0}

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

        location = `${location.origin}/mrental`;
    })
}