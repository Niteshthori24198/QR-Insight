console.log("from login page")
//simple login with mail and password=====================================
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
        if(data.Name){
            alert(data.msg)
            window.location.href="index.html"
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
    // fetch('http://localhost:3000/user/auth/google')
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data);
    //     fetch('http://localhost:3000/user/profile', {
    //     //   headers: {
    //     //     Authorization: `Bearer ${data.accessToken}`
    //     //   }
    //     })
    //       .then(res => res.json())
    //       .then(profile => {
    //         console.log(profile);
    //         //profileName.textContent = profile.name;
    //       })
    //       .catch(err => console.error(err));
    //   })
    //   .catch(err => console.error(err));
  });