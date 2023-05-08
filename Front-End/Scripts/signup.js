console.log("form signup")
let name1=document.getElementById("raj-username")
let email=document.getElementById("raj-email")
let password=document.getElementById("raj-pass")
let address=document.getElementById("raj-address")
let gender=document.getElementById("raj-gender")

let form=document.getElementById("raj-form")

form.addEventListener("submit",(e)=>{
    e.preventDefault();


    if(!name1.value || !email.value || !password.value || !gender.value || !address.value){
        alert("Kindly provide all required details for registration !!")
        return
    }


    let userobj={
        Name:name1.value,
        Email:email.value,
        Password:password.value,
        Address:address.value,
        Gender:gender.value,

    }



    console.log(userobj)

    fetch("http://localhost:3000/user/register",{
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
    })
    .catch((err)=>{
        console.log(err)
    })

})

