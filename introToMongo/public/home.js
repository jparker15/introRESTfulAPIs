window.onload = () => {


    setEventListeners()

        //div containing elements/inputs of each movie
    const displayDivs = document.getElementsByClassName("displayMovie");

    for (const div of displayDivs){div.style.display = "flex"};
        //hidden inputs for PATCH req div
    const editDivs = document.getElementsByClassName("editMovie");

    for (const div of editDivs){div.style.display = "none"};
        //button to submit edit inputs/fetch PATCH req
    const editSubmit = document.getElementsByClassName("editMovieBtn");

    document.getElementById("loginBtn").onclick = loginUser;

    document.getElementById("logoutBtn").onclick = logoutUser;

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


            if(iterator.name === "release" && inputValue < new Date().getFullYear() - 100 || inputValue > new Date().getFullYear() + 2)   {
                
                // console.log(iterator,inputValue);
                return alert(`Release Year must between ${new Date().getFullYear() - 100} and ${new Date().getFullYear() + 2}`)

            }

            
        }
            //test if link.value contains wiki anywhere in URL
        if(!(new RegExp(/wiki/g).test(form.link))){
            validationErr.push("WIKI Link Must include wiki")
        }

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

        const movieID = this.parentElement.parentElement.id,

            endpoint = `http://localhost:3015/movie/${movieID}`;

        fetch(endpoint) 
        .then(rs => {
            console.log(rs);
            
            return rs.json()})
        .then(res =>{
            console.log("res:",res);
            
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