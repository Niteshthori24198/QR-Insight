
const BaseUrl_signup = `https://angry-cummerbund-newt.cyclic.app`



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





let name1 = document.getElementById("raj-username")
let email = document.getElementById("raj-email")
let password = document.getElementById("raj-pass")
let address = document.getElementById("raj-address")
let gender = document.getElementById("raj-gender")

let form = document.getElementById("raj-form")

form.addEventListener("submit", (e) => {
    e.preventDefault();


    if (!name1.value || !email.value || !password.value || !gender.value || !address.value) {
        alert("Kindly provide all required details for registration !!")
        return
    }

    document.getElementById('qr-Registerbtn').innerHTML = `<i class="fa fa-refresh fa-spin"></i> Register`
    document.getElementById('qr-Registerbtn').disabled = true;


    let userobj = {
        Name: name1.value,
        Email: email.value,
        Password: password.value,
        Address: address.value,
        Gender: gender.value,

    }



    // console.log(userobj)

    fetch(`${BaseUrl_signup}/user/register`, {
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
            // console.log(data)
            document.getElementById('qr-Registerbtn').innerHTML = `Register`;
            document.getElementById('qr-Registerbtn').disabled = false;

            customAlert.alert(data.msg, 'QR Insight!🚫')

            setTimeout(() => {
                customAlert.ok()
                location.href = './login.html'
            }, 3000)

            // alert(data.msg)
        })
        .catch((err) => {
            document.getElementById('qr-Registerbtn').innerHTML = `Register`
            document.getElementById('qr-Registerbtn').disabled = false;

            customAlert.alert(data.msg, 'QR Insight!🚫')

            setTimeout(() => {
                customAlert.ok()
                location.reload()
            }, 3000)

            console.log(err)
        })

})

