
window.onload = () =>{
    const deleteBtns = document.getElementsByClassName("deleteGPU");

    for(const button of deleteBtns){
        button.onclick = deleteCard;
    }

    const editBtns = document.getElementsByClassName("editGPU");

    for(const button of editBtns){
        button.onclick = openForm;
    }

    const submitBtns = document.getElementsByClassName("submitEdit");

    for(const button of submitBtns){
        button.onclick = submitPatchReq;
    }

    postRoute.onclick = postPage;
    homeRoute.onclick = homePage;
}

function openForm(){
    //reveals hidden input form 
    const nodeList = this.parentElement.childNodes;
    
    for (const node of nodeList) {
        
        if(node.className == "updateForm"){
            
            node.style.display = node.style.display == "none" ? "block": "none";
            
        }
        
    }
    
}

function postPage () {

    //change location to post route

    location = `${location.origin}/postgpu`;

}

function homePage (){
    location = `${location.origin}`
}

function deleteCard () {   

    if(!confirm("Press Enter to Confirm Delete")){
        return alert("Delete has been canceled")
    }
    
    const cardID = this.parentElement.id,

          endpoint = `${location.origin}/admin/delete/${cardID}`,

          reqObj = {method:"DELETE"};

    fetch(endpoint,reqObj)
    .then(rs => {
        if (rs.status === 200){
            location.reload();
        }
    })
    .then(res =>{
        console.log(res);
        
    })

    console.log(cardID);
    
}

function submitPatchReq () {

    //console.log(this.parentElement.parentElement.childNodes);

    const cardID = this.parentElement.parentElement.parentElement.id,

    form = this.parentElement.parentElement.childNodes[0]

    endpoint = `${location.origin}/admin/update/${cardID}`,

    reqBody = {},

    reqObj = {
        
        headers: {
        "Access-Control-Allow-Origin":"*",
        Accept: "application/json",
        "content-type":"application/json"
        },
        method:"PATCH",

        body: JSON.stringify(reqBody)

    };

    console.log(cardID);
    
    
    for (const input of form) {
        
        if(input.nodeName == "INPUT"){

            let inputValue = input.value.trim();

            console.log(input,inputValue);

            if(inputValue != ""){
                reqBody[input.name] = inputValue;
            }
            
            
        }   
    }
    

    
    
    fetch(endpoint,reqObj)
    .then(rs=>{return rs.json()})
    .then(res =>{
        console.log("Response:",res);
    
    })
    .catch(err=>{console.error(`home-page.js;\nError has occured,Err:${err}`);
    })


}