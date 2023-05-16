
const BaseUrl_signup = `https://angry-cummerbund-newt.cyclic.app`


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

    document.getElementById('qr-Registerbtn').innerHTML = `<i class="fa fa-refresh fa-spin"></i> Register`
    document.getElementById('qr-Registerbtn').disabled = true;


    let userobj={
        Name:name1.value,
        Email:email.value,
        Password:password.value,
        Address:address.value,
        Gender:gender.value,

    }



    console.log(userobj)

    fetch(`${BaseUrl_signup}/user/register`,{
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
        document.getElementById('qr-Registerbtn').innerHTML = `Register`
        document.getElementById('qr-Registerbtn').disabled = false;
        alert(data.msg)
    })
    .catch((err)=>{
        document.getElementById('qr-Registerbtn').innerHTML = `Register`
        document.getElementById('qr-Registerbtn').disabled = false;
        console.log(err)
    })

})

