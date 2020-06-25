window.onload = () => {

    setEventListeners()

        //div containing elements/inputs of each movie
    const displayDivs = document.getElementsByClassName("displayMovie");

    for (const div of displayDivs){div.style.display = "flex";}
        //hidden inputs for PATCH req div
    const editDivs = document.getElementsByClassName("editMovie");

    for (const div of editDivs){div.style.display = "none";}
        //button to submit edit inputs/fetch PATCH req
    const editSubmit = document.getElementsByClassName("editMovieBtn")

    allMovies.style.display = "flex";
    
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

        //console.log(form);

        let reqBody = {};

        for (const iterator of form) {

            let inputValue = iterator.value.trim();

            console.log(inputValue);

            if(inputValue != ""){

                reqBody[iterator.name] = inputValue;
            }

        }
          
    
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
    let confirm = prompt(`Type "confirm" to delete document`);
        //end request with alert if prompt isn't not met
    if (confirm != "confirm"){
        return alert("document has not been Deleted")
    };
    
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