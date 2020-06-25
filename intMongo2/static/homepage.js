
window.onload = () =>{
    const deleteBtns = document.getElementsByClassName("deleteGPU");

    for(const button of deleteBtns){
        button.onclick = deleteCard;
    }

    const editBtns = document.getElementsByClassName("patchGPU");

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
        
    })

    console.log(cardID);
    
}

function editCard () {

        console.log(this.parentElement.id);
        

}

function updateGPU (){
    const cardID = this.parentElement.id,

    endpoint = `${location.origin}/update/${cardID}`,

    reqObj = {method:"PATCH"};

fetch(endpoint,reqObj)
.then(rs=>{return rs.json()})
.then(res =>{
    console.log(res);

    

    window.location.reload();

    
})

}
