window.onload = () => {
    //set event listeners for buttons/s (rent/return)
    // set up xhr ("patch") in the onclick event handler 
        // proper responses to the client (alert, dom element update, dom event)

    setEventListeners()

        //div containing elements/inputs of each movie
    const displayDivs = document.getElementsByClassName("displayMovie");

    for (const div of displayDivs){div.style.display = "flex"};
        //hidden inputs for PATCH req div
    const editDivs = document.getElementsByClassName("editMovie");

    for (const div of editDivs){div.style.display = "none"};
        //button to submit edit inputs/fetch PATCH req
    const editSubmit = document.getElementsByClassName("editMovieBtn");

    allMovies.style.display = "flex";
}

function logoutUser (){
    const token = document.cookie.indexOf("token");
    // console.log(token);

    if (token !== -1){
        document.cookie = "token=; expires =`Thu, 01 Jan 1970 00:00:00: UTC` ;path=/"; 
        alert("You have logged out");
        location.reload();
    
    }
    else{
        alert("You are not logged in")
    }
}

function loginUser () {
    
    location = location.origin+"/login"

}

function setEventListeners (){
                
    const infoBtns = document.getElementsByClassName("getMovie");

    for (const button of infoBtns) {
        button.onclick = getMovieInfo;
    }

    const deleteBtns = document.getElementsByClassName("deleteMovie");

    for (const button of deleteBtns) {
        button.onclick = deleteMovie;
    }

    const editViewBtns = document.getElementsByClassName("editMovieBtn");

    for (const button of editViewBtns) {
        button.onclick = editView;
    }
    
    const editSubmitBtns = document.getElementsByClassName("submitEdit");

    for (const button of editSubmitBtns) {
        button.onclick = submitEditReq;
    }

    const loginBtn =  document.getElementById("loginBtn");

    if(loginBtn){
        loginBtn.onclick = loginUser;
    }

    const logoutBtn = document.getElementById("logoutBtn");

    if(logoutBtn){
        logoutBtn.onclick = logoutUser; 
    }

    const adminBtn = document.getElementById("adminBtn");

    if(adminBtn){
        adminBtn.onclick = () =>{
            location = `${location.origin}/admin`
        }
    }

    const rentBtns = document.getElementsByClassName("rentBtn");

    for(const button of rentBtns){
        button.onclick = rentMovie;
    }
    const returnBtns = document.getElementsByClassName("returnBtn");

    for(const button of returnBtns){
        button.onclick = returnMovie;
    }

    const nonUserBtn = document.getElementsByClassName("nonUserBtn");
    for(const button of nonUserBtn){
        button.onclick = loginUser;
    }

    const regPgBtn = document.getElementById("regPageBtn");
    if(regPgBtn){
        regPgBtn.onclick = () =>{
            location = `${location.origin}/register`
        }
    }

}

function submitEditReq () { //id of mongoDB object
    //console.log(this.parentElement.parentElement.parentElement.id);

    const movieID = this.parentElement.parentElement.parentElement.id,
          
        form = this.parentElement;

        console.log(form);

        let reqBody = {};

        let validationErr = [];

        for (const iterator of form) {

            let inputValue = iterator.value.trim();

           // console.log(iterator,inputValue);

           if(iterator.validationMessage != "" ){
            validationErr.push(`${iterator.name}:${iterator.validationMessage}`)
            }
        
            if(inputValue != ""){

                reqBody[iterator.name] = inputValue;
            }


            // if(iterator.name === "release" 
            // && inputValue < new Date().getFullYear() - 100 || inputValue > new Date().getFullYear() + 2)   {
                
            //     // console.log(iterator,inputValue);
            //     return alert(`Release Year must between ${new Date().getFullYear() - 100} and ${new Date().getFullYear() + 2}`)

            // }

            
        }
            // test if link.value contains wiki anywhere in URL
        // const wikiRegExp = /wiki/g
        // if(!(wikiRegExp.test(form.link))){
        //     validationErr.push("WIKI Link Must include wiki")
        // }

        if(validationErr.length > 0){
            const message = `Error/s :\n\n${validationErr.join("\n")}`;

            return alert(message);
        }
            
        reqObj ={
        
            headers: { //allow access at all origins 
            "Access-Control-Allow-Origin": "*",
    
            Accept: "application/json",
    
            "content-type": "application/json",
            },
    
            method: "PATCH",
    
            body: JSON.stringify(reqBody)
    
        }
    
    
        const endpoint = `${location.origin}/movie/patch/${movieID}`;
    
        fetch(endpoint,reqObj)
        .then(rs => {
            if (rs.status === 200){
                alert("Movie has been successfully updated!")
            }
            else{
               alert("an error occurred during PATCH req to DB")

            }
        })
        .then(res => {
            console.log("Response:",res);

            location.reload()
        })
        .catch(err => {console.log(`Error has occured, Err:${err}`);
        })
          
    
}

function editView() {
    //console.log(this.parentElement.parentElement.childNodes);

    const movieDivChildren = this.parentElement.parentElement.childNodes;

    movieDivChildren.forEach(element => {

        //console.log(element.style.display,element.className);
        

        if(element.className == "displayMovie" || element.className === "editMovie"){

           element.style.display = element.style.display == "none"? "flex" :"none";

        }
    });
    
}

function getMovieInfo (){
    
    // const xhr = new XMLHttpRequest();

    //    // console.log(this.parentElement);
        

    //     const movieID = this.parentElement.id;

    //     const endpoint = `http://localhost:3015/movie/${movieID}`;
    
    //     xhr.open("GET",endpoint,true);

    //     xhr.onload = () =>{

    //         const parseResTxt = JSON.parse(xhr.responseText);
            
    //         console.log(parseResTxt);
                       
    //     };

    //     xhr.send();

        //FETCH

        const movieID = this.parentElement.id,

            endpoint = `http://localhost:3015/movie/getmovie/${movieID}`;

        fetch(endpoint) 
        .then(rs => {
            // console.log(rs);
            
            return rs.json()})
        .then(res =>{
            console.log(res);
            
        })

        
    
}

function deleteMovie () {
   // console.log(this);
   // console.log(location.origin);
                    //freeze code to run prompt before continuing DELETE req
    let confirmPrompt = confirm(`click "confirm" to delete document`);
        //end request with alert if prompt isn't not met
    if (!confirmPrompt){
        return alert("document has not been Deleted")
    }
    
    // const movieID = this.parentElement.parentElement.id,
    const movieID = this.parentElement.parentElement.id,

         endpoint = `${location.origin}/movie/delete/${movieID}`,

         reqObj = {method:"DELETE"};

    fetch(endpoint,/*reqObj,*/ {
        method:"DELETE"
    })      //return json form of readable stream
    .then(rs => {
     //console.log(rs.status);

        if (rs.status === 200) { //doc DB deletion success, delete element from frontend
            this.parentElement.parentElement.remove()
        }
        else{   //alert user that req was unsuccessful
            const resMsg = "an error occurred during DELETE req to DB"

            alert(resMsg)
        }
        
        
        
    })

    .then(res =>{
        console.log(res);

        //this.parentElement.remove();
        
    })

}

function rentMovie () {
    // console.log(document.cookie);

    const movieId = this.parentElement.id;

    // endpoint, reqBody, fetch req, parse msg from api req

    const endpoint = `${location.origin}/user/rent_return`;

    const reqBody = {
        movieId: movieId,
        isRenting: true,
        
    };

    const reqOpts = {

        headers: { //allow access at all origins 
            "Access-Control-Allow-Origin": "*",
    
            Accept: "application/json",
    
            "content-type": "application/json",
            },
    
            method: "PATCH",
    
            body: JSON.stringify(reqBody)
    
    };



    fetch(endpoint,reqOpts)
    .then(rs=> {
        if(rs === 200){
            alert ("Successful Movie Rental")        
        }
        else {
            alert ("can not rent movie twice")
        }
})
    .then(res=>console.log(res))
    .catch(err =>{
        console.log({
            error: err.message || err
        });
    })

}

function returnMovie(){
    console.log(this.parentElement.id);

    const movId = this.parentElement.id;

    const endpoint = `${location.origin}/user/rent_return`;

    const reqBody = {
        isRenting: false,
        movieId: movId,
    };

    const reqOpts = {

       headers: {"Access-Control-Allow-Origin" :"*",

        Accept: "application/json",
        
        "content-type":"application/json",
        },
        method: "PATCH",

        body: JSON.stringify(reqBody)
    };

    fetch(endpoint,reqOpts)
    .then(rs=>{

        if (rs.status === 200){
            alert("Successful Movie Return")
        }
        else{
            const resMsg = `can not return movie twice`
            alert(resMsg)
        }
    })
        
    .then(res=> console.log(res))
    .catch(err=>{
        const errMsg = err.message||err;

        console.log({
            error: errMsg
        })
    })


}