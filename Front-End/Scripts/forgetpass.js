
const BaseUrl_forgotPassword = `https://angry-cummerbund-newt.cyclic.app`

var form1 = document.getElementById("raj-form1");
var form2 = document.getElementById("raj-form2");
var form3 = document.getElementById("raj-form3");

var next1 = document.getElementById("raj-next1");
var next2 = document.getElementById("raj-next2");
var next3 = document.getElementById("raj-next3");

var progress = document.getElementById("raj-progress");
let USER
next1.addEventListener("click", () => {
    let email = document.getElementById("raj-email").value
    if (!email) {
        alert("Enter Your Email ID")
    } else {
        let obj = {
            Email: email
        }

        next1.innerHTML = `<i class="fa fa-refresh fa-spin"></i> Next`;
        next1.disabled = true;

        fetch(`${BaseUrl_forgotPassword}/user/forgetpass`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)

        })
            .then((res) => {
                return res.json()
            })
            .then((user) => {
                console.log(user)

                if (!user.userdetails) {

                    next1.innerHTML = `Next`;
                    next1.disabled = false;

                    alert("Your Account Not Found (404) => Please Register First");

                } else {
                    next1.innerHTML = `Next`;
                    next1.disabled = false;

                    USER = user.userdetails
                    alert("Your OTP has been sent on your email.")
                    form1.style.left = "-450px";
                    form2.style.left = "40px";
                    progress.style.width = "240px";
                }
            })
    }
})


next2.addEventListener("click", () => {
    let otp = document.getElementById("raj-otp").value

    if(!otp){
        alert('Enter OTP')
        return
    }

    //alert(otp)
    let obj = {
        OTP: otp
    }

    next2.innerHTML = `<i class="fa fa-refresh fa-spin"></i> Verify`;
    next2.disabled = true;

    fetch(`${BaseUrl_forgotPassword}/user/verifyotp`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)

    })
        .then((res) => {
            return res.json()
        })
        .then((user) => {
            console.log(user)

            next2.innerHTML = `Verify`;
            next2.disabled = false;

            if (user.msg == "OTP verified Successfully") {
                alert(user.msg)
                form2.style.left = "-450px";
                form3.style.left = "40px";
                progress.style.width = "360px";
            } else {
                alert(user.msg)

            }
        })

})

next3.addEventListener("click", (e) => {
    e.preventDefault()
    let pass = document.getElementById("raj-new").value
    let conpass = document.getElementById("raj-cnew").value

    // console.log(pass, conpass)
    // console.log(USER)

    if (pass == "" && conpass == "") {
        alert("Please Fill The Required Details")
    } else if (pass == conpass) {
        console.log(USER)

        next3.innerHTML = `<i class="fa fa-refresh fa-spin"></i> Submit`;
        next3.disabled = true;

        fetch(`${BaseUrl_forgotPassword}/user/updatepass/?id=${USER._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "password": pass })

        })
            .then((res) => {
                return res.json()
            })
            .then((msg) => {

                next3.innerHTML = `Submit`;
                next3.disabled = false;

                alert(msg.msg)
                window.location.href = "../View/login.html"
            })

    } else {
        alert("Your Password And Confirm Password Not Match.")
    }
})
