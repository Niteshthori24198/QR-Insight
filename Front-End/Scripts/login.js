
const BaseUrl_login = `https://angry-cummerbund-newt.cyclic.app`





// ***************************
// Custom Alert Message 

function CustomAlert() {
    this.alert = function (message, title) {
        document.body.innerHTML = document.body.innerHTML + '<div id="dialogoverlay"></div><div id="dialogbox" class="slit-in-vertical"><div><div id="dialogboxhead"></div><div id="dialogboxbody"></div><div id="dialogboxfoot"></div></div></div>';

        let dialogoverlay = document.getElementById('dialogoverlay');
        let dialogbox = document.getElementById('dialogbox');

        let winH = window.innerHeight;
        dialogoverlay.style.height = winH + "px";

        dialogbox.style.top = "100px";

        dialogoverlay.style.display = "block";
        dialogbox.style.display = "block";

        document.getElementById('dialogboxhead').style.display = 'block';

        if (typeof title === 'undefined') {
            document.getElementById('dialogboxhead').style.display = 'none';
        } else {
            document.getElementById('dialogboxhead').innerHTML = '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ' + title;
        }
        document.getElementById('dialogboxbody').innerHTML = message;
        // document.getElementById('dialogboxfoot').innerHTML = '<button class="pure-material-button-contained active" onclick="customAlert.ok()">OK</button>';
    }

    this.ok = function () {
        document.getElementById('dialogbox').style.display = "none";
        document.getElementById('dialogoverlay').style.display = "none";
        return true
    }
}

let customAlert = new CustomAlert();

// ***************************






//simple login with mail and password=====================================
let email = document.getElementById("raj-email")
let password = document.getElementById("raj-pass")
let form = document.getElementById("raj-form")

form.addEventListener("submit", (e) => {
    e.preventDefault()

    if (!email.value || !password.value) {
        alert("Kindly provide all required details for registration !!")
        return
    }

    document.getElementById('qr-loginbtn').innerHTML = `<i class="fa fa-refresh fa-spin"></i> Login`
    document.getElementById('qr-loginbtn').disabled = true;


    let userobj = {
        Email: email.value,
        Password: password.value
    }
    console.log(userobj)

    fetch(`${BaseUrl_login}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userobj)

    })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log(data)
            if (data.userdetails) {
                localStorage.setItem("qrcodeuserdetails", JSON.stringify(data.userdetails))

                document.getElementById('qr-loginbtn').innerHTML = `Login`
                document.getElementById('qr-loginbtn').disabled = false;

                customAlert.alert(data.msg, 'QR Insight✔️')

                // alert(data.msg);
                setTimeout(() => {
                    window.location.href = "../index.html"
                }, 3000)

            } else {

                document.getElementById('qr-loginbtn').innerHTML = `Login`
                document.getElementById('qr-loginbtn').disabled = false;

                customAlert.alert(data.msg, 'QR Insight!🚫')

                setTimeout(() => {
                    customAlert.ok()
                    location.reload()
                }, 3000)

                // alert(data.msg)
            }

        })
        .catch((err) => {

            document.getElementById('qr-loginbtn').innerHTML = `Login`
            document.getElementById('qr-loginbtn').disabled = false;

            customAlert.alert('Something went wrong.', 'QR Insight!')

            setTimeout(() => {
                customAlert.ok()
                location.reload()
            }, 3000)

            console.log(err)
        })
})


//login with google===================================================
let googlebtn = document.getElementById("raj-google")

googlebtn.addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('raj-google').innerHTML = `<i class="fa fa-refresh fa-spin"></i> Google`;
    window.location.href = `${BaseUrl_login}/user/auth/google`;

});


//login with github=====================
let githubbtn = document.getElementById("raj-github")

githubbtn.addEventListener("click", () => {
    document.getElementById('raj-github').innerHTML = `<i class="fa fa-refresh fa-spin"></i> Github`;
    window.location.href = "https://github.com/login/oauth/authorize?client_id=91d7325bd615799a7790&scope=user"
})