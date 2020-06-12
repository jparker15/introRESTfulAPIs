document.body.style.backgroundColor = "black";

window.onload = () => {


    const xhr = new XMLHttpRequest(),

        endpoint = `${location}movie/all`;

        xhr.open("GET",endpoint,true);

        xhr.onload = () => {

            const parsedData = JSON.parse(xhr.responseText);
            console.log(parsedData);


            //display data to DOM with function
            displayMovies(parsedData.movies);

        };

        xhr.send();

       

 
}

displayMovies = (allMovies) =>{
    for (let i = 0; i < allMovies.length; i++) {
        
        const movies = allMovies[i],
            title = document.createElement("h1"),
            release = document.createElement("h3"),
            movieIMG = document.createElement("img");

            title.innerText = movies.title;
            release.innerText = movies.release;

            movieIMG.src = movies.img;
            movieIMG.alt = movies.title + "IMG";

            document.body.appendChild(title);
            document.body.appendChild(release);
            document.body.appendChild(movieIMG);
        
    }
}