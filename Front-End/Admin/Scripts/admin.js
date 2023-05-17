$(".nav").click(function () {
    $("#mySidenav").css('width', '70px');
    $("#main").css('margin-left', '70px');
    $(".logo").css('visibility', 'hidden');
    $(".logo span").css('visibility', 'visible');
    $(".logo span").css('margin-left', '-10px');
    $(".icon-a").css('visibility', 'hidden');
    $(".icons").css('visibility', 'visible');
    $(".icons").css('margin-left', '-8px');
    $(".nav").css('display', 'none');
    $(".nav2").css('display', 'block');
});

$(".nav2").click(function () {
    $("#mySidenav").css('width', '300px');
    $("#main").css('margin-left', '300px');
    $(".logo").css('visibility', 'visible');
    $(".icon-a").css('visibility', 'visible');
    $(".icons").css('visibility', 'visible');
    $(".nav").css('display', 'block');
    $(".nav2").css('display', 'none');
});


// ********************** Count DB ***************************//

let totalFeedbacks = 0;
let totalUsers = 0;
let qrCodeDetailsDb = {}


const qrcodeuserdetails_adminpage = JSON.parse(localStorage.getItem('qrcodeuserdetails')) || null;
if(qrcodeuserdetails_adminpage){
    console.log(qrcodeuserdetails_adminpage);
    const USERNAME = qrcodeuserdetails_adminpage.Name
    document.getElementById('nameOfAdmin').innerText = USERNAME
}else{
    location.href = '../../View/login.html'
}

// *******************   API REQUEST *************************//


const BaseUrl_adminPage = `https://angry-cummerbund-newt.cyclic.app`


fetch(`${BaseUrl_adminPage}/feed/getdata`)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        console.log('feedbacks', data)
        totalFeedbacks = data?.msg?.length;
        document.getElementById('total_count_feedback').innerText = totalFeedbacks;
        displaydataFeedbacks(data.msg);
    })



fetch(`${BaseUrl_adminPage}/user/getallusers`)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        console.log('users==>', data)
        // console.log('===>', data.msg);
        totalUsers = data?.users?.length;
        document.getElementById('total_count_users').innerText = totalUsers;
        displaydataUsers(data.users);
    })


fetch(`${BaseUrl_adminPage}/qrcode/getallQR`).then(res => res.json())
    .then(data => {
        console.log(data);
       
        makeQRCodeArray(data.Qrcodesdata);
    }).catch(err => {
        console.log(err);
    })




let DashboardPage = document.getElementById("Dashboard--page")
let UsersPage = document.getElementById("Users--page")
let LogsPage = document.getElementById("Logs--page")
let FeedbackPage = document.getElementById("Feedback--page")




// ................................. Dashboard .........................................//
goToDashboardPage();

function goToDashboardPage() {
    document.getElementById("headingOfPage").innerHTML = "☰ Dashboard";
    document.getElementById("headingOfPage2").innerHTML = "☰ Dashboard";
    DashboardPage.style.display = "block";
    UsersPage.style.display = "none";
    LogsPage.style.display = "none";
    FeedbackPage.style.display = "none";
}

function makeQRCodeArray(data) {
    let count = 0
    const obj = data.reduce((acc, curr) => {
        // console.log(curr.QRCodes);
        curr.QRCodes.forEach((item) => {
            const key = item.Formate
            count++
            if (acc[key]) {
                acc[key]++
            } else {
                acc[key] = 1
            }
        })

        return acc
    }, {})
    console.log(obj);

    document.getElementById('total_count_qr').innerText = count;

    document.getElementById('total_text_qr_count').innerText = obj['text'] || 0; 
    document.getElementById('total_link_qr_count').innerText = obj['link'] || 0; 
    document.getElementById('total_upi_qr_count').innerText = obj['upi'] || 0; 
    document.getElementById('total_zoom_qr_count').innerText = obj['zoom'] || 0; 
    document.getElementById('total_wifi_qr_count').innerText = obj['wifi'] || 0; 
    document.getElementById('total_phone_qr_count').innerText = obj['phone'] || 0; 
    document.getElementById('total_wa_qr_count').innerText = obj['whatsapp'] || 0; 
    document.getElementById('total_vcard_qr_count').innerText = obj['vcard'] || 0; 
    document.getElementById('total_email_qr_count').innerText = obj['email'] || 0; 

    qrCodeDetailsDb = obj;
    dashboardPageFunctions(obj)
}


function dashboardPageFunctions(obj) {

    // Extract labels and counts from the data
    const labels = Object.keys(obj).map((word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }));
    const counts = Object.values(obj);

    console.log(labels, counts)

    // Create the pie chart
    const ctx = document.getElementById('pie-chart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: counts,
                backgroundColor: ["#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                    "#E7E9ED",
                    "#FF6384",
                    "#4BC0C0"], // Custom colors for each slice
                hoverBackgroundColor: ["#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                    "#E7E9ED",
                    "#FF6384",
                    "#4BC0C0"] // Colors on hover
            }]
        },
        options: {
            responsive: true
        }
    });
}



// ................................. Users .........................................//
function goToUserPage() {
    document.getElementById("headingOfPage").innerHTML = "☰ Users Details";
    document.getElementById("headingOfPage2").innerHTML = "☰ Users Details";
    DashboardPage.style.display = "none";
    UsersPage.style.display = "block";
    LogsPage.style.display = "none";
    FeedbackPage.style.display = "none";
}




// ................................. Logs .........................................//
function goToLogsPage() {
    document.getElementById("headingOfPage").innerHTML = "☰ Activity Details";
    document.getElementById("headingOfPage2").innerHTML = "☰ Activity Details";
    DashboardPage.style.display = "none";
    UsersPage.style.display = "none";
    LogsPage.style.display = "block";
    FeedbackPage.style.display = "none";
}





// ................................. Feedbacks .........................................//
async function goToFeedbackPage() {
    document.getElementById("headingOfPage").innerHTML = "☰ Feedback Details";
    document.getElementById("headingOfPage2").innerHTML = "☰ Feedback Details";
    DashboardPage.style.display = "none";
    UsersPage.style.display = "none";
    LogsPage.style.display = "none";
    FeedbackPage.style.display = "block";
}





function displaydataFeedbacks(data) {
    console.log(data)

    let main = document.getElementById("append_feedbacks")
    data.forEach((element) => {
        let tr = document.createElement("tr")

        let td1 = document.createElement("td")
        td1.innerText = element.name

        let td2 = document.createElement("td")
        td2.innerText = element.email

        let td3 = document.createElement("td")
        td3.innerText = element.message

        let td4 = document.createElement("td")
        td4.innerText = "Reply"
        td4.setAttribute('class', "replybtnofFeedback")
        td4.addEventListener("click", () => {
            let subject = 'QR Insight Follow-Up: Your Feedback Query'.split(' ').join('%20')
            let name = element.name.split(' ').join('%20')
            let body = `Dear%20${name}`
            window.location.href = `mailto:${element.email}?subject=${subject}&body=${body}`
        })



        tr.append(td1, td2, td3, td4)
        main.append(tr)
    });

}


function displaydataUsers(data) {
    console.log(data)

    let main = document.getElementById("usersDetailbody")
    data.forEach((element) => {
        console.log(element);
        let tr = document.createElement("tr")

        let td1 = document.createElement("td")
        td1.innerText = element.Name

        let td2 = document.createElement("td")
        td2.innerText = element.Email

        let td3 = document.createElement("td")
        td3.innerText = element.Address

        let td4 = document.createElement("td")
        td4.innerText = element.Gender

        let td5 = document.createElement("td")
        td5.innerText = element.Role

        let td6 = document.createElement("td")
        if (element.ismailverified) {
            td6.innerText = 'Active';
            td6.setAttribute('class', "verifiedUserBtn");
        }else{
            td6.innerText = 'Freez';
            td6.setAttribute('class', "notVerifiedUserBtn");
        }




        let td7 = document.createElement("td")
        td7.innerText = element.Role === 'Admin' ? "Change to User" : "Change to Admin"
        td7.setAttribute('class', "updateRoleBtn");
        td7.addEventListener("click", () => {
            console.log('update role clicked');
        })


        let td8 = document.createElement("td")
        td8.innerText = "Reply"
        td8.setAttribute('class', "anouncemnetbtnUser");
        td8.addEventListener("click", () => {
            let subject = 'Important QR Insight Announcement'
            let name = element.Name.split(' ').join('%20')
            let body = `Dear%20${name}`
            const url = `mailto:${element.Email}?subject=${subject}&body=${body}`
            console.log(url);
            window.location.href = url
        })



        tr.append(td1, td2, td3, td4, td5, td6, td7,td8)
        main.append(tr)
    });


}


function goToHomePage() {
    location.href = '../index.html'
}