console.log("hello")
{/* <script src="../Scripts/userdisplay.js"></script> */}


let a = new URLSearchParams(window.location.search)
let b=a.get('userid')
console.log(b)


fetch(`http://localhost:3000/user/getdata/${b}`)
.then((res)=>{
    return res.json()
})
.then((user)=>{
    userdetails=user
    console.log(user.userdetails.Name)
    localStorage.setItem("userdetails",JSON.stringify(user.userdetails))
})
.catch((err)=>{
    console.log(err)
})

