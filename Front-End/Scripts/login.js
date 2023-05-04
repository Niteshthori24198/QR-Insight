console.log("from login page")

let email=document.getElementById("raj-email")
let password=document.getElementById("raj-pass")
let form=document.getElementById("raj-form")

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    //console.log(email.value,password.value)
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
        alert(data.msg)
        let otp=prompt("enter the correct otp")
        //verifyotp(otp)
    })
    .catch((err)=>{
        console.log(err)
    })
})