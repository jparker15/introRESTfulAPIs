window.onload = () => {
    console.log(searchBar);

    searchBar.onkeyup = autoSearch; 

}

function autoSearch() {

    const input = searchBar.value;

    fetch (location.origin+"/search/"+input)
    //fetch API returns a promise, dev handles promise with a .then and .catch for errors

    .then(rs=>{
        console.log(rs)
        return rs.json()
    })
    .then(response=>{console.log(response);})
    .catch(err=>{
        let msg = err.message|| err; 

        console.log(msg);
        
    })


}

