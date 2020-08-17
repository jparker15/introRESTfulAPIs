window.onload = () => {
    // set event listeners

    document.addEventListener("keydown", (event) =>{
        if (event.keyCode === 13){
            document.getElementById("submitReg").click()
        }
    })

    setEventListeners()
}

//xhr posts

const setEventListeners = () =>{
    const submitReg = document.getElementById("submitReg");

    submitReg.onclick = () =>{
        const email = document.getElementById("email");

        const pass = document.getElementById("password");

        const conpass = document.getElementById("conPass");

        console.log();
    }

    const formDiv = document.getElementById("formDiv");

        // console.log(formDiv.childNodes);

    
   

}
