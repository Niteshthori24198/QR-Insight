
const BaseUrl_navbarJS = `https://angry-cummerbund-newt.cyclic.app`

// const userIdInURL = new URLSearchParams(window.location.search)

const icon = document.querySelector(".menu-page")
function hamburger() {
    console.log("menu-icon")
    icon.classList.add("activate")
}
function remove() {
    console.log("close")
    icon.classList.remove("activate")
}
const dropdownMenu = document.querySelector(".dropdown-menu")
function openProduct() {
    console.log("open")
    dropdownMenu.classList.toggle("activate")
}
const menuPrice = document.querySelector(".dropdown-price")
function openPrice() {
    console.log("open")
    menuPrice.classList.toggle("activate")
}

showUsername()

setTimeout(() => {
    showUsername()
}, 3000)


function showUsername() {
    const name1 = document.querySelector(".userName1")
    const name2 = document.querySelector(".userName2")

    let details = localStorage.getItem("qrcodeuserdetails") || null

    if (details) {
        details = JSON.parse(localStorage.getItem("qrcodeuserdetails"))
    }

    if (details) {

        name1.textContent = details.Name.split(" ")[0]
        name2.textContent = details.Name.split(" ")[0]
        document.getElementById("logoutBtn").style.display = "block"
        document.getElementById("loginBtn").style.display = "none"
        document.getElementById("userIcon").style.display = "block"

        if (details.Role === "Admin") {
            document.getElementById('Dashboard_admin_nav').style.display = "block"
        }

    }
}





function clearLocalStorage() {

    if(!confirm('Do You Want To Logout ?')){
        return
    }


    document.getElementById("logoutBtn").style.display = "none";
    document.getElementById("loginBtn").style.display = "block";

    document.getElementById('Dashboard_admin_nav').style.display = "none"

    document.getElementById("userIcon").style.display = "none"



    // clearing query from link

    var currentUrl = window.location.href;

    // Check if the URL contains the query parameter we want to remove
    if (currentUrl.indexOf('?userid=') !== -1) {
        // Remove the query parameter
        var newUrl = currentUrl.replace(/(\?|&)userid=[^&]*(&|$)/, '$1');

        // Update the URL without refreshing the page
        history.replaceState(null, null, newUrl);
    }


    logoutUser()

}


function logoutUser() {

    fetch(`${BaseUrl_navbarJS}/user/logout`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log(data);
            localStorage.removeItem("qrcodeuserdetails");
            alert(data.msg)
            location.reload()
        }).catch(err => {
            console.log(err);
        })
}



// // check access token
// setTimeout(() => {
//     fetch(`${BaseUrl_navbarJS}/user/checkAccessToken`)
//         .then(res => res.json())
//         .then(data => {

//             console.log(data);
            

//             if (data.isValidToken) {

//                 console.log('Alright');

//             } else {

//                 localStorage.removeItem('qrcodeuserdetails')
//                 alert('Please Login Again (Session Time Out)22');

//             }

//         }).catch(err => {
//             console.error(err);
//             localStorage.removeItem('qrcodeuserdetails')
//             alert('Please Login Again (Session Time Out)');
//         })
// }, 5000)