
window.onload = () =>{
    const deleteBtns = document.getElementsByClassName("deleteCard");

    for(const button of deleteBtns){
        button.onclick = deleteCard;
    }

    const editBtns = document.getElementsByClassName("editCard");

    for(const button of editBtns){
        button.onclick = editCard;
    }

    postGPU.onclick = postPage;
}

function postPage () {

    //change location to post route

    location = `${location.origin}/post`;

}

function deleteCard () {

    const cardID = this.parentElement.id,

          endpoint = `${location.origin}/delete/${cardID}`,

          reqObj = {method:"DELETE"};

    fetch(endpoint,reqObj)
    .then(rs => {return rs.json()})
    .then(res =>{
        console.log(res);

        this.parentElement.remove();

        window.location.reload();
        
    })

    console.log(cardID);
    
}

function editCard () {

}

