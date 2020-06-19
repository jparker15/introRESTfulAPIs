

window.onload = () => {


    const xhr = new XMLHttpRequest(),

        endpoint = `${location}movie/all`;

        xhr.open("GET",endpoint,true);

        xhr.onload = () => {

            const parsedData = JSON.parse(xhr.responseText);
            console.log(parsedData);

            createDOM();
            //display data to DOM with function
            displayMovies(parsedData.movies);

        };

        xhr.send();

       

 
}

createDOM = () => {
    // const initDiv = document.createElement("div"),
    //      movieDiv = document.createElement("div"),
    //      availMov = document.createElement("div"),
    //      rentedMov = document.createElement("div"),
    //      UIDiv = document.createElement("div");

    //      initDiv.id = "initDiv";
    //      movieDiv.id = "movieDiv";
    //      UIDiv.id = "UIDiv";

    //     initDiv.appendChild(movieDiv);
    //     initDiv.appendChild(UIDiv);
    // document.body.appendChild(initDiv);
    const avlDiv = document.createElement('div'),
        rntDiv = document.createElement('div'),
        avlBtn = document.createElement('button'),
        rntBtn = document.createElement('button'),
        randomBtn = document.createElement('button');

    avlDiv.id = 'avldiv';
    rntDiv.id = 'rntdiv';
    avlBtn.id = 'avlbtn';
    rntBtn.id = 'rntbtn';
    randomBtn.id = 'testbtn';
    avlBtn.innerText = 'See Movie Choices';
    rntBtn.innerText = 'See What Others Are Watching Now';
    randomBtn.innerText = 'testing'
    avlBtn.onclick = createAvlDsply;
    rntBtn.onclick = createRntDsply;
    randomBtn.onclick = rentRandomMov;
    avlDiv.style.backgroundColor = 'pink';
    rntDiv.style.backgroundColor = 'lightgreen';
    avlDiv.style.textAlign = 'center';
    document.body.appendChild(avlDiv);
    document.body.appendChild(avlBtn);
    document.body.appendChild(rntDiv);
    document.body.appendChild(rntBtn);
    document.body.appendChild(randomBtn);
}

displayMovies = (allMovies) =>{
    for (let i = 0; i < allMovies.length; i++) {
        
        const movies = allMovies[i],
            div = document.createElement("div"),
            title = document.createElement("h1"),
            release = document.createElement("h3"),
            movieIMG = document.createElement("img");

            title.innerText = movies.title;
            release.innerText = movies.release;

            movieIMG.src = movies.img;
            movieIMG.alt = movies.title + "IMG";

            div.appendChild(title);
            div.appendChild(release);
            div.appendChild(movieIMG);

            document.body.appendChild(div);
            
           
        
    }
}

createAvlDsply = () => {
    
}
createRntDsply = () => {

}
rentRandomMov = () => {

}