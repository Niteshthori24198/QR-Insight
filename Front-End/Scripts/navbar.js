

const icon=document.querySelector(".menu-page")
function hamburger(){
    console.log("menu-icon")
    icon.classList.add("activate")
}
function remove(){
    console.log("close")
    icon.classList.remove("activate")
}
const dropdownMenu=document.querySelector(".dropdown-menu")
function openProduct(){
    console.log("open")
    dropdownMenu.classList.toggle("activate")        
}
const menuPrice=document.querySelector(".dropdown-price")
function openPrice(){
    console.log("open")
    menuPrice.classList.toggle("activate")        
}  


// let userName=[{name:"venkat",role:"Admin"}]
// localStorage.setItem("qrcodeuserdetails",JSON.stringify(userName));
const name1=document.querySelector(".userName1")
const name2=document.querySelector(".userName2")
details =JSON.parse(localStorage.getItem("qrcodeuserdetails"))

if(details){
    name1.textContent =details.Name
    name2.textContent =details.Name
    logoutBtn.style.display="block"
    document.getElementById("loginBtn").style.display="none"
    document.getElementById("userIcon").style.display="block"
    
}
function clearLocalStorage(){
    localStorage.removeItem('qrcodeuserdetails');
    alert("Logout Successfully")
}