const BaseUrl_adminusers = `https://angry-cummerbund-newt.cyclic.app`

fetch(`${BaseUrl_adminusers}/user/getallusers`)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        //console.log(data.msg)
        console.log('===>',data.msg);
        displaydataUsers(data.users)
    })

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
        td6.innerText = element.Role==='Admin' ? "Change to User" : "Change to Admin"
        td6.setAttribute('class',"updateRoleBtn");
        td6.addEventListener("click", () => {
            console.log('update role clicked');
        })


        let td7 = document.createElement("td")
        td7.innerText = "Reply"
        td7.setAttribute('class',"anouncemnetbtnUser");
        td7.addEventListener("click", () => {
            let subject = 'Important QR Insight Announcement'
            let name = element.Name.split(' ').join('%20')
            let body = `Dear%20${name}`
            const url = `mailto:${element.Email}?subject=${subject}&body=${body}`
            console.log(url);
            window.location.href = url
        })



        tr.append(td1, td2, td3, td4, td5, td6, td7)
        main.append(tr)
    });





}