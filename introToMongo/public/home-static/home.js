window.onload = () => {

    const infoBtns = document.getElementsByClassName("getMovie");

    for (const button of infoBtns) {
        button.onclick = getMovieInfo;
    }

    const deleteBtns = document.getElementsByClassName("deleteMovie")

    for (const button of deleteBtns) {
        button.onclick = deleteMovie;
    }

  
    
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

            endpoint = `http://localhost:3015/movie/${movieID}`;

        fetch(endpoint) 
        .then(rs => {return rs.json()})
        .then(res =>{
            console.log(res);
            
        })

        
    
}

function deleteMovie () {
   // console.log(this);
   // console.log(location.origin);
    
    const movieID = this.parentElement.id,

         endpoint = `${location.origin}/movie/delete/${movieID}`,

         reqObj = {method:"DELETE"};

    fetch(endpoint,/*reqObj,*/ {
        method:"DELETE"
    })      //retrun json form of readable stream
    .then(rs => {return rs.json()})
    .then(res =>{
        console.log(res);

        this.parentElement.remove();
        
    })

}