window.onload=()=>{

    document.addEventListener("keydown", (event) =>{
        if (event.keyCode === 13){
            document.getElementById("submitLogin").click()
        }
    })

    // console.log(document.cookie);

    document.getElementById("submitLogin").onclick = () =>{
    
       const email = document.getElementById("email").value;

       const password = document.getElementById("password").value;

        const reqBody = {

            email: email,
            password: password,

        };
        const endpoint = `${location.origin}/user/login`;

        const reqOptions = {
            headers: {

                Accept: "application/json",

                "content-type": "application/json",
            },
            method:"PATCH",
            body: JSON.stringify(reqBody)
        }

        fetch(endpoint,reqOptions)
        .then(rs=>{
            console.log(rs);
            return rs.json()
        })
        .then(res =>{

            const token = res.token; 
        
            if(token === undefined){
                alert("Login Failed")
            }
            else{

                document.cookie = `token=${token}`;
                
                // localStorage.setItem("loginToken",token);

                location = `${location.origin}`;
            }
            //console.log(res);
        })
        

    }
}