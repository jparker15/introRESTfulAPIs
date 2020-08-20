window.onload = () => {
    // set event listeners

  
    setEventListeners()

    passwordCheck()
}

const passwordCheck = () =>{
    const pass = document.getElementById("password");
    const conpass = document.getElementById("conpass");
    const passMsg = document.getElementById("passMsg");

    if(pass.value.trim() == "" || conpass.value.trim() == ""){
        passMsg.style.display = "none";
    }

    pass.onkeyup = () =>{
        passMsg.style.display = "inline";
        if(pass.value.length >=7 && pass.value != conpass.value){
            passMsg.innerText = "passwords do not match";
            passMsg.style.color = "red";
        }
        if(pass.value === conpass.value){
            passMsg.innerText = "issa Match"
            passMsg.style.color = "green";
        }
    }

    conpass.onkeyup = () =>{
        passMsg.style.display = "inline";
        if(conpass.value.length >= 7 && conpass.value != pass.value){
            passMsg.innerText = "please confirm password";
            passMsg.style.color = "maroon";
        }
        if(conpass.value === conpass.value){
            passMsg.innerText = "Issa match"
            passMsg.style.color = "lightgreen"
        }
    }


}

//xhr posts

const setEventListeners = () =>{

    document.addEventListener("keydown", (event) =>{
        if (event.keyCode === 13){
            document.getElementById("submitReg").click()
        }
    })

    const submitReg = document.getElementById("submitReg");

    submitReg.onclick = () =>{
      
        let reqBody = {};
        // push missing value to this array
        let missingInput = [];

        const registForm = document.getElementById("formDiv").childNodes[0];

        for (const iterator of registForm) {
            // console.log(iterator);
            if(iterator.type != "button" ){
                reqBody[iterator.name] = iterator.value;

                if(iterator.value.trim() === ""){
                    missingInput.push(iterator.name)
                }
            }
            
        }

        if (missingInput.length > 0){

           const missMsg = missingInput.map(key =>{
                alert`${key} is required`
            })

            return  alert(missMsg)
        }

        console.log(missingInput);

        if(reqBody.pass !== reqBody.conpass){
            return alert("passwords do not match")
        };
        if(reqBody.pass === undefined || reqBody.conpass === undefined){
            return alert("please enter password and confirm password")
        };

        const endpoint = `${location.origin}/user`;

        const reqOpts = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                Accept: "application/json",
                "content-type": "application/json",

            },
            method:"POST",
            body:JSON.stringify(reqBody)
        };

    //    console.log(reqOpts);

        fetch(endpoint,reqOpts)
        .then(rs=>{
            console.log(rs);
            return rs.json()
        })
        .then(res =>{
            console.log(res);

            if(res.hasOwnProperty("validation_error" != undefined)){
                let errMsg = "";
                res.validation_error.forEach(error => {
                    errMsg += `Error With ${titleCase(error.key)}:\n ${error.message}\n\n `
                });
                alert(errMsg)
            }
        })

    }

    const formDiv = document.getElementById("formDiv");

        // console.log(formDiv.childNodes);
    const cancelReg = document.getElementById("cancelReg");
    if(cancelReg){
        cancelReg.onclick = () =>{
            location = `${location.origin}`
        }
    }
    
   

}
