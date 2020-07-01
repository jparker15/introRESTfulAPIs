
window.onload = () =>{
    
    postRoute.onclick = postPage;

    dbRoute.onclick = dbPage;
}


function postPage () {

    //change location to post route

    location = `${location.origin}/postgpu`;

}

function dbPage(){
    location = `${location.origin}/database`;
}
