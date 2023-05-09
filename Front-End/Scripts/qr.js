
const QR_BASE_URL = `https://angry-cummerbund-newt.cyclic.app/qrcode`;




const qrcodeuserdetails_qrpage = localStorage.getItem('qrcodeuserdetails') || null;
// console.log(qrcodeuserdetails_qrpage);
if(!qrcodeuserdetails_qrpage){
    alert('Kindly Login First');
    location.href = '../View/login.html'
}



// QR Option tabs 

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}




// Select Design Images

const designImagesHTML = `<div class="main-container">
                            <h2>Select your favourite Design</h2>
                            <div class="radio-buttons">
                                <label class="custom-radio">
                                    <input type="radio" name="design" value="blue" checked />
                                    <span class="radio-btn"><i class="las la-check"></i>
                                        <img src="../images/qr-design/blue-1.png" alt="">

                                    </span>
                                </label>
                                <label class="custom-radio">
                                    <input type="radio" name="design" value="black" />
                                    <span class="radio-btn"><i class="las la-check"></i>
                                        <img src="../images/qr-design/black-2.png" alt="">
                                    </span>
                                </label>
                                <label class="custom-radio">
                                    <input type="radio" name="design" value="pink" />
                                    <span class="radio-btn"><i class="las la-check"></i>
                                        <img src="../images/qr-design/pink-3.png" alt="">
                                    </span>
                                </label>
                                <label class="custom-radio">
                                    <input type="radio" name="design" value="brown" />
                                    <span class="radio-btn"><i class="las la-check"></i>
                                        <img src="../images/qr-design/brown-4.png" alt="">
                                    </span>
                                </label>
                                <label class="custom-radio">
                                    <input type="radio" name="design" value="red" />
                                    <span class="radio-btn"><i class="las la-check"></i>
                                        <img src="../images/qr-design/red-5.png" alt="">
                                    </span>
                                </label>
                                <label class="custom-radio">
                                    <input type="radio" name="design" value="crimson" />
                                    <span class="radio-btn"><i class="las la-check"></i>
                                        <img src="../images/qr-design/chrimston-6.png" alt="">
                                    </span>
                                </label>
                            </div>
                            </div>`;








const qr_select_designEl = document.querySelectorAll('.qr_select_design');

for (let el of qr_select_designEl) {

    el.innerHTML = designImagesHTML;

}





// ********************************

let QrColorDesign = 'black';

// ********************************





const design = document.getElementsByName('design');

for (d of design) {

    d.addEventListener("change", (event) => {

        QrColorDesign = event.target.value;

        console.log(event.target.value);

    })
}




// *************************************************************

//    QR=Image

const QR_Code_img_text = document.getElementById('QR_Code_img_text');

const QR_Code_img_link = document.getElementById('QR_Code_img_link');

const QR_Code_img_phone = document.getElementById('QR_Code_img_phone');

const QR_Code_img_upi = document.getElementById('QR_Code_img_upi');

const QR_Code_img_wa = document.getElementById('QR_Code_img_wa');

const QR_Code_img_email = document.getElementById('QR_Code_img_email');

const QR_Code_img_zoom = document.getElementById('QR_Code_img_zoom');

const QR_Code_img_wifi = document.getElementById('QR_Code_img_wifi');

const QR_Code_img_vcard = document.getElementById('QR_Code_img_vcard');



// Text QR Code Generator
const text_qr_form = document.getElementById('text_qr_form');

text_qr_form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const msg = text_qr_form['text-message-qr'].value.trim()


    if (!msg) {
        alert(`Please write a valid infomation ! `);
        return
    }


    if (!QrColorDesign) QrColorDesign = "black"


    QR_Code_img_text.src = `https://cdn.dribbble.com/users/964000/screenshots/3675038/switcher_qr_barcode_alinashi_shot.gif`;



    const payload = {
        text: msg,
        color: QrColorDesign
    }


    const res = await fetch(`${QR_BASE_URL}/text`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
    }).then(res => res.json()).catch(err => {
        console.log(err);
    })


    setTimeout(() => {

        QR_Code_img_text.src = res.qrcode;
        // document.getElementById('text_qr_download').href = res.qrcode;

    }, 5000);

})


//    Link QR Code Generator
const link_qr_form = document.getElementById('link_qr_form');

link_qr_form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const link = link_qr_form['link-url-qrl'].value.trim()

    if (!link) {
        alert(`Please write a valid infomation ! `);
        return
    }

    if (!QrColorDesign) QrColorDesign = "black"


    QR_Code_img_link.src = `https://cdn.dribbble.com/users/964000/screenshots/3675038/switcher_qr_barcode_alinashi_shot.gif`;


    const payload = {
        URL: link,
        color: QrColorDesign
    }


    const res = await fetch(`${QR_BASE_URL}/link`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
    }).then(res => res.json()).catch(err => {
        console.log(err);
    })


    setTimeout(() => {

        QR_Code_img_link.src = res.qrcode;
        // document.getElementById('link_qr_download').href = res.qrcode;

    }, 5000);

})


// Phone QR Generator
const phone_qr_form = document.getElementById('phone_qr_form');

phone_qr_form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const countrycode = phone_qr_form['select_country_code_phone'].value.trim()

    const phoneNumber = phone_qr_form['phone-number-qrl'].value.trim()


    if (!countrycode || !phoneNumber) {
        alert(`Please write a valid infomation ! `);
        return
    }


    if (!QrColorDesign) QrColorDesign = "black"


    QR_Code_img_phone.src = `https://cdn.dribbble.com/users/964000/screenshots/3675038/switcher_qr_barcode_alinashi_shot.gif`;


    const payload = {
        phone: `${countrycode}${phoneNumber}`,
        color: QrColorDesign
    }


    const res = await fetch(`${QR_BASE_URL}/phone`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
    }).then(res => res.json()).catch(err => {
        console.log(err);
    })


    setTimeout(() => {

        QR_Code_img_phone.src = res.qrcode;
        // document.getElementById('phone_qr_download').href = res.qrcode;

    }, 5000);

})


// QR for Whatsapp
const whatsapp_qr_form = document.getElementById('whatsapp_qr_form');

whatsapp_qr_form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const countrycode = whatsapp_qr_form['select_country_code_wa'].value.trim()

    const phoneNumber = whatsapp_qr_form['wa-number-qrl'].value.trim()

    const Message = whatsapp_qr_form['wa-text-message-qr'].value.trim()


    if ((countrycode && !phoneNumber) || (!phoneNumber && !Message && !countrycode)) {
        alert(`Please write a valid infomation ! `);
        return
    }


    if (!QrColorDesign) QrColorDesign = "black"


    QR_Code_img_wa.src = `https://cdn.dribbble.com/users/964000/screenshots/3675038/switcher_qr_barcode_alinashi_shot.gif`;

    const payload = {
        phone: `${countrycode}${phoneNumber}`,
        text: Message,
        color: QrColorDesign
    }

    const res = await fetch(`${QR_BASE_URL}/whatsapp`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
    }).then(res => res.json()).catch(err => {
        console.log(err);
    })


    setTimeout(() => {

        QR_Code_img_wa.src = res.qrcode;
        // document.getElementById('wa_qr_download').href = res.qrcode;

    }, 5000);
})


// QR generation for UPI
const upi_qr_form = document.getElementById('upi_qr_form')

upi_qr_form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name = upi_qr_form['upi-id-name'].value.trim()

    const upi = upi_qr_form['upi-id-qrl'].value.trim()

    const amount = upi_qr_form['upi-id-amount-qrl'].value.trim()


    if (!name || !upi) {
        alert(`Please write a valid infomation ! `);
        return
    }


    if (!QrColorDesign) QrColorDesign = "black"


    QR_Code_img_upi.src = `https://cdn.dribbble.com/users/964000/screenshots/3675038/switcher_qr_barcode_alinashi_shot.gif`;



    const payload = {
        name: name,
        upi: upi,
        amount: amount,
        color: QrColorDesign
    }

    const res = await fetch(`${QR_BASE_URL}/upi`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
    }).then(res => res.json()).catch(err => {
        console.log(err);
    })


    setTimeout(() => {

        QR_Code_img_upi.src = res.qrcode;
        // document.getElementById('upi_qr_download').href = res.qrcode;

    }, 5000);
})





// QR generation for Email

const email_qr_form = document.getElementById('email_qr_form');

email_qr_form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const mailto = email_qr_form['email_id_qr'].value.trim()

    const subject = email_qr_form['email_subject_qr'].value.trim()

    const body = email_qr_form['email-body-qr'].value.trim()


    if (!mailto) {
        alert(`Please write a valid infomation ! `);
        return
    }


    if (!QrColorDesign) QrColorDesign = "black"


    QR_Code_img_email.src = `https://cdn.dribbble.com/users/964000/screenshots/3675038/switcher_qr_barcode_alinashi_shot.gif`;



    const payload = {
        mailto,
        subject,
        body,
        color: QrColorDesign
    }

    console.log(payload)

    const res = await fetch(`${QR_BASE_URL}/email`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
    }).then(res => res.json()).catch(err => {
        console.log(err);
    })

    setTimeout(() => {

        QR_Code_img_email.src = res.qrcode;
        // document.getElementById('email_qr_download').href = res.qrcode;

    }, 5000);

})





// QR generation for Email

const zoom_qr_form = document.getElementById('zoom_qr_form');

zoom_qr_form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const meetingId = zoom_qr_form['zoom_meeting_id_qr'].value.trim()

    const meetingLink = zoom_qr_form['zoom_meeting_url_qr'].value.trim()


    if (!meetingId && !meetingLink) {
        alert(`Please write a valid infomation ! `);
        return
    }


    if (!QrColorDesign) QrColorDesign = "black"


    QR_Code_img_zoom.src = `https://cdn.dribbble.com/users/964000/screenshots/3675038/switcher_qr_barcode_alinashi_shot.gif`;


    const payload = {
        meetingId,
        meetingLink,
        color: QrColorDesign
    }


    const res = await fetch(`${QR_BASE_URL}/zoom`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
    }).then(res => res.json()).catch(err => {
        console.log(err);
    })



    setTimeout(() => {

        QR_Code_img_zoom.src = res.qrcode;
        // document.getElementById('zoom_qr_download').href = res.qrcode;

    }, 5000);
})




// QR generation for Email

const wifi_qr_form = document.getElementById('wifi_qr_form');

wifi_qr_form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const ssid = wifi_qr_form['wifi-ssid'].value.trim()

    const encryption = wifi_qr_form['select_network_security_type'].value.trim()

    const password = wifi_qr_form['wifi-password'].value.trim()


    if (!ssid && !password) {
        alert(`Please write a valid infomation ! `);
        return
    }


    if (!QrColorDesign) QrColorDesign = "black"


    QR_Code_img_wifi.src = `https://cdn.dribbble.com/users/964000/screenshots/3675038/switcher_qr_barcode_alinashi_shot.gif`;


    const payload = {
        ssid,
        password,
        encryption,
        color: QrColorDesign
    }


    const res = await fetch(`${QR_BASE_URL}/wifi`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
    }).then(res => res.json()).catch(err => {
        console.log(err);
    })


    setTimeout(() => {

        QR_Code_img_wifi.src = res.qrcode;
        // document.getElementById('wifi_qr_download').href = res.qrcode;

    }, 5000);

})





// QR code for Visiting Card

const vcard_qr_form = document.getElementById('vcard_qr_form');

vcard_qr_form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name = vcard_qr_form['vcard-name'].value.trim()
    const email = vcard_qr_form['vcard-email'].value.trim()
    const phone = vcard_qr_form['vcard-phone-number'].value.trim()
    const address = vcard_qr_form['vcard-address'].value.trim()
    const company = vcard_qr_form['vcard-company'].value.trim()
    const position = vcard_qr_form['vcard-position'].value.trim()
    const website = vcard_qr_form['vcard-website-link'].value.trim()




    if (!name || !email || !phone) {
        alert(`Please write a valid infomation ! `);
        return
    }


    if (!QrColorDesign) QrColorDesign = "black"


    QR_Code_img_vcard.src = `https://cdn.dribbble.com/users/964000/screenshots/3675038/switcher_qr_barcode_alinashi_shot.gif`;


    const payload = { name, email, phone, address, company, position, website, color: QrColorDesign }


    const res = await fetch(`${QR_BASE_URL}/vcard`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
    }).then(res => res.json()).catch(err => {
        console.log(err);
    })


    setTimeout(() => {

        QR_Code_img_vcard.src = res.qrcode;
        // document.getElementById('vcard_qr_download').href = res.qrcode;

    }, 5000);

})





// ......................... Print QR CODE ..................


function HandlePrint() {
    window.print();
}


// ............................. Share via Email .......................

function HandleShareEmail(ele_id) {

    const qrcode = document.getElementById(ele_id).src;

    if (qrcode == 'https://cdn.qrplanet.com/proxy/qrcdr/images/placeholder.svg') {
        alert('Please Generate QR First')
        return
    }


    fetch(`https://good-tan-fly-belt.cyclic.app/saveQr`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            qrcode: qrcode
        })
    })
        .then(res => res.json())
        .then(data => {

            console.log(data.QR._id);

            location.href = `mailto:?subject=<Important Read Required>Your%20QR&body=https://qr-insight-sharing.netlify.app/?id=${data.QR._id}`

        })

}



// Sharing via Whatsapp


function HandleShareWhatsapp(ele_id) {

    const qrcode = document.getElementById(ele_id).src;

    if (qrcode == 'https://cdn.qrplanet.com/proxy/qrcdr/images/placeholder.svg') {
        alert('Please Generate QR First')
        return
    }


    fetch(`https://good-tan-fly-belt.cyclic.app/saveQr`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            qrcode: qrcode
        })
    })
        .then(res => res.json())
        .then(data => {

            console.log(data.QR._id);

          

            location.href =   `https://wa.me//?text=https://qr-insight-sharing.netlify.app/?id=${data.QR._id}`;

        })
}







// Download QR COde


function HandleDownload(ele_id) {

    const qrcode = document.getElementById(ele_id).src;

    if(qrcode == 'https://cdn.qrplanet.com/proxy/qrcdr/images/placeholder.svg'){
        alert('Please Generate QR First')
        return
    }else{
        console.log('all good');
        let a = document.createElement('a')
        a.href = qrcode 
        a.download = "QR_Insight.jpg"
        a.click()
    }
   


}