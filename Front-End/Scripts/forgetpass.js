var form1 = document.getElementById("raj-form1");
var form2 = document.getElementById("raj-form2");
var form3 = document.getElementById("raj-form3");
var next1 = document.getElementById("raj-next1");
var next2 = document.getElementById("raj-next2");
var next3 = document.getElementById("raj-next3");

var progress = document.getElementById("raj-progress");
let USER
next1.addEventListener("click",()=>{
    let email=document.getElementById("raj-email").value
    if(!email){
        alert("enter an email")
    }else{
    let obj={
        Email:email
    }
    
    fetch(`http://localhost:3000/user/forgetpass`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)

    })
    .then((res)=>{
        return res.json()
    })
    .then((user)=>{
        console.log(user)
        
        if(!user.userdetails){
            alert("user not exist register first")
        }else{
            USER=user.userdetails
            alert("sending an OTP on mail")
            form1.style.left = "-450px";
            form2.style.left = "40px";
            progress.style.width = "240px";
        }
    })
}
})


next2.addEventListener("click",()=>{
    let otp=document.getElementById("raj-otp").value
    //alert(otp)
    let obj={
        OTP:otp
    }
    fetch(`http://localhost:3000/user/verifyotp`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)

    })
    .then((res)=>{
        return res.json()
    })
    .then((user)=>{
        console.log(user)
        
        if(user.msg=="Otp verified"){
            alert(user.msg)
            form2.style.left = "-450px";
            form3.style.left = "40px";
            progress.style.width ="360px";
        }else{
            alert(user.msg)

        }
    }) 

})

next3.addEventListener("click",(e)=>{
    e.preventDefault()
    let pass=document.getElementById("raj-new").value
    let conpass=document.getElementById("raj-cnew").value
    console.log(pass,conpass)
    console.log(USER)
    if(pass==conpass){
        console.log(USER)

        fetch(`http://localhost:3000/user/updatepass/?id=${USER._id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"password":pass})
    
        })
        .then((res)=>{
            return res.json()
        })
        .then((msg)=>{
            alert(msg.msg)
            window.location.href="../View/login.html"                  
        })

    }
})
