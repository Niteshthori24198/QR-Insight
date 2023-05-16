
const BaseUrl_feedbackjs = `https://angry-cummerbund-newt.cyclic.app`


//  submit fom 

// const url = "http://localhost:3000";


document.getElementById('submitFeedback_user').addEventListener('submit', (e)=>{
  e.preventDefault();
  feedback()
})

function feedback() {
  let name = document.getElementById("name-pankaj").value;
  let email = document.getElementById("email-pankaj").value;
  let message = document.getElementById("text-message").value;

  let signdata = {
    name: name,
    email: email,
    message: message,
  };
  console.log(signdata)
  fetch(`${BaseUrl_feedbackjs}/feed/savefeedback`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(signdata)

  })
    .then((res) => res.json())
    .then((res) => {
      document.getElementById("name-pankaj").value = "";
      document.getElementById("email-pankaj").value = "";
      document.getElementById("text-message").value = "";

      alert("Thanks for reaching out! I'll be happy to help! we will connect to you soon on your mail")


    })
    .catch((err) => {
      alert(err)
      console.log(err)

    });
}