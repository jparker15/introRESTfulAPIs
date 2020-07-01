window.onload = () => {
    
    submitBtn.onclick = submitPostReq;

    homeBtn.onclick = homePageRoute;

    dbBtn.onclick = dBPageRoute;

}

function homePageRoute(){

    location = location.origin;

}

function dBPageRoute(){

    location = `${location.origin}/database`;

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

    const endpoint = `${location.origin}/admin/post`;

    fetch(endpoint, reqObj)
    .then(rs =>{return rs.json()})
    .then(response =>{
        console.log("Response:", response);
        
         if ( response.status != 201){
             alert(`${response.error}`)
         }
         else {
             alert(`${response.message}`)
         }

        // location = `${location.origin}`;
    })
    
}

