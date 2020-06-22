window.onload = () => {
    
    submitBtn.onclick = submitPostReq;

    homeBtn.onclick = returnHomePage;

}

function returnHomePage(){

    location = location.origin;

}

function submitPostReq () {
   
    let reqBody = {};
                        //class name of form in postGPU.pug
    for (const iterator of postForm) {
        console.log(iterator);
        
        reqBody[iterator.name] = iterator.value;

    };

    reqObj = {
        
        headers: {
            "Access-Control-Allow-Origin":"*",
            Accept: "application/json",
            "content-type":"application/json"
        },
        method:"POST",
        body: JSON.stringify(reqBody)

    };

    const endpoint = `${location.origin}/post`;

    fetch(endpoint, reqObj)
    .then(rs =>{return rs.json()})
    .then(response =>{
        console.log("Response:" + response);
        
        // alert("POST REQUESTED");

        // location = `${location.origin}`;
    })
    
}

