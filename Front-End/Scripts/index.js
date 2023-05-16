
const BaseUrl_LandingJS = `https://angry-cummerbund-newt.cyclic.app`

// check access token
setTimeout(() => {
    const qrcodeuserdetails_LanfingPage = JSON.parse(localStorage.getItem('qrcodeuserdetails')) || null;
    if (qrcodeuserdetails_LanfingPage) {
        fetch(`${BaseUrl_LandingJS}/user/checkAccessToken`)
            .then(res => res.json())
            .then(data => {

                console.log(data);


                if (data.isValidToken) {

                    console.log('Alright');

                } else {
                    console.log('Token Expired');
                    localStorage.removeItem('qrcodeuserdetails')
                    alert('Please Login Again (Session Time Out)');

                }

            }).catch(err => {
                console.error(err);
                // localStorage.removeItem('qrcodeuserdetails')
                alert('501 => (Internal Server Error)');
            })
    }
}, 5000)