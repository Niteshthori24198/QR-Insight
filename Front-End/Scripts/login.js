
const BaseUrl_login = `https://angry-cummerbund-newt.cyclic.app`


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

    document.getElementById('qr-loginbtn').innerHTML = `<i class="fa fa-refresh fa-spin"></i> Login`
    document.getElementById('qr-loginbtn').disabled = true;


    let userobj={
        Email:email.value,
        Password:password.value
    }
    console.log(userobj)

    fetch(`${BaseUrl_login}/user/login`,{
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
            localStorage.setItem("qrcodeuserdetails",JSON.stringify(data.userdetails))

            document.getElementById('qr-loginbtn').innerHTML = `Login`
            document.getElementById('qr-loginbtn').disabled = false;
            
            alert(data.msg);
            window.location.href="../index.html"
            
        }else{
            document.getElementById('qr-loginbtn').innerHTML = `Login`
            document.getElementById('qr-loginbtn').disabled = false;
            alert(data.msg)
        }
        
        //window.location.href="index.html"
    })
    .catch((err)=>{
        document.getElementById('qr-loginbtn').innerHTML = `Login`
        document.getElementById('qr-loginbtn').disabled = false;
        console.log(err)
    })
})


//login with google===================================================
let googlebtn=document.getElementById("raj-google")

googlebtn.addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('raj-google').innerHTML = `<i class="fa fa-refresh fa-spin"></i> Google`;
    window.location.href=`${BaseUrl_login}/user/auth/google`;
    
});


//login with github=====================
let githubbtn=document.getElementById("raj-github")

githubbtn.addEventListener("click",()=>{
    document.getElementById('raj-github').innerHTML = `<i class="fa fa-refresh fa-spin"></i> Github`;
    window.location.href="https://github.com/login/oauth/authorize?client_id=91d7325bd615799a7790&scope=user"
})