
const BaseUrl_UserDisplay = `https://angry-cummerbund-newt.cyclic.app`

let a = new URLSearchParams(window.location.search);

let b=a.get('userid');

// console.log(b)

let obj={
    _id:b
}



if(b){
    fetch(`${BaseUrl_UserDisplay}/user/getdata/?_id=${b}`)
    .then((res)=>{
        return res.json()
    })
    .then((user)=>{
        userdetails=user
        console.log(user.userdetails.Name)
        localStorage.setItem("qrcodeuserdetails",JSON.stringify(user.userdetails))
        
    })
    .catch((err)=>{
        console.log(err)
    })


}




