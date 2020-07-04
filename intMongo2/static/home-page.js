
window.onload = () =>{
    
    // postRoute.onclick = postPage;

    // dbRoute.onclick = dbPage;

    // searchBar.input = searchFunc;
    
}

function searchFunc () {
    console.log(this.value);
    
}


function postPage () {

    //change location to post route

    location = `${location.origin}/postgpu`;

}

function dbPage(){
    location = `${location.origin}/database`;
}
