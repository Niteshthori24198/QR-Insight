console.log("from login page")
//simple login with mail and password=====================================
let email=document.getElementById("raj-email")
let password=document.getElementById("raj-pass")
let form=document.getElementById("raj-form")

form.addEventListener("submit",(e)=>{
    e.preventDefault()

    if(!email.value || !password.value){
        alert("Kindly provide all required details for registration !!")
        return
    }


    let userobj={
        Email:email.value,
        Password:password.value
    }
    console.log(userobj)

    fetch("http://localhost:3000/user/login",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userobj)

    })
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        console.log(data)
        if(data.userdetails){
            alert(data.msg)
            window.location.href="../index.html"
            localStorage.setItem("qrcodeuserdetails",JSON.stringify(data.userdetails))
            
        }else{
            alert(data.msg)
        }
        
       //window.location.href="index.html"
    })
    .catch((err)=>{
        console.log(err)
    })
})


//login with google===================================================
let googlebtn=document.getElementById("raj-google")

googlebtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href="http://localhost:3000/user/auth/google"

});


//login with github=====================
let githubbtn=document.getElementById("raj-github")

githubbtn.addEventListener("click",()=>{
    window.location.href="https://github.com/login/oauth/authorize?client_id=91d7325bd615799a7790&scope=user"
})