
window.onload = () =>{
    
    createInitElems()

    Load()
}

function Load () {

    const xhr = new XMLHttpRequest(),
    
        endpoint = `${location}all`;

        xhr.open("GET",endpoint,true);

        xhr.onload = () => {
            
            const parsedData = JSON.parse(xhr.responseText);

            console.log(parsedData.entries);


            
        }

        xhr.send();
}

function postEntry (entry) {
    
}