window.onload = () => {
    // set event listeners

  setEventListeners()
}

//xhr posts

const setEventListeners = () =>{
    const submitReg = document.getElementById("submitReg");

    submitReg.onclick = () =>{
        console.log("tesering");
    }

    const formDiv = document.getElementById("formDiv");

        // console.log(formDiv.childNodes);

   

}

const registInput = () =>{
    for (const iterator of formDiv.childNodes) {
        //    console.log(iterator.type);
            if (iterator.type === "email") {
                
            }
           
        }
}