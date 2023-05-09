
const BaseUrl_feedbackadmin = `https://angry-cummerbund-newt.cyclic.app`


fetch(`${BaseUrl_feedbackadmin}/feed/getdata`)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        //console.log(data.msg)
        displaydataFeedbacks(data.msg)
    })

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
        td4.setAttribute('class',"replybtnofFeedback")
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