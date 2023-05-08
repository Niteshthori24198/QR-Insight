

const qrcodeuserdetails_qrpage11 = localStorage.getItem('qrcodeuserdetails') || null;
// console.log(qrcodeuserdetails_qrpage);
if(!qrcodeuserdetails_qrpage11){
    alert('Kindly Login First');
    location.href = '../View/login.html'
}



setTimeout(() => {
    // showUsername_profile();
    populate();
}, 1000)



const userNameHeading = document.getElementById("login-user-name");

const userName = document.getElementById("login-user-name-input")
const userEmail = document.getElementById("login-user-email")
const userAddress = document.getElementById("login-user-address")
const userRole = document.getElementById("login-user-role")
const userGender = document.getElementById("login-user-gender")



function populate() {
    const details = JSON.parse(localStorage.getItem("qrcodeuserdetails")) || null
    console.log(details)

    if (details) {
        userNameHeading.innerText = details.Name

        userName.value = details.Name;
        userEmail.value = details.Email;
        userAddress.value = details.Address;
        userRole.value = details.Role;
        userGender.value = details.Gender
    }
}



function forgotPasswordBtnProfile() {
    console.log("update")
    location.href = "./forgetpass.html"
}


function updateProfile(){
    console.log('update click');

    const payload = {
        Name : userName.value,
        Address : userAddress.value,
        Gender : userGender.value
    }

    const detailsforuserid = JSON.parse(localStorage.getItem("qrcodeuserdetails")) || null
    if(!detailsforuserid){
        alert('login first')
        return
    }

    if(!detailsforuserid._id){
        alert('login first')
        return
    }

    
    fetch(`http://localhost:3000/profile/updateProfile/${detailsforuserid._id}`, {
        method : "PATCH",
        headers : {
            "Content-type" : "application/json",
        },
        body : JSON.stringify( payload )
    })
    .then(res => res.json() )
    .then(data => {
        if(data.success){
            localStorage.setItem('qrcodeuserdetails', JSON.stringify(data.user))
            window.location.reload()
        }else{
            console.log(data?.error);
            alert('something went wrong. try after some time')
        }
    }).catch(err => {
        console.error(err);
        alert('something went wrong. try after some time')
    })



}




function deleteProfile(){
    
    const detailsforuserid = JSON.parse(localStorage.getItem("qrcodeuserdetails")) || null
    if(!detailsforuserid){
        alert('login first')
        return
    }

    if(!detailsforuserid._id){
        alert('login first')
        return
    }

    
    fetch(`http://localhost:3000/profile/deleteProfile/${detailsforuserid._id}`, {
        method : "DELETE"
    })
    .then(res => res.json() )
    .then(data => {
        console.log(data);

        localStorage.removeItem('qrcodeuserdetails');
        location.href = '../index.html'
        
    }).catch(err => {
        console.error(err);
        alert('something went wrong. try after some time')
    })

}
