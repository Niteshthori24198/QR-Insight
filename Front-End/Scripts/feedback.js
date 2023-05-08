
//  submit fom 

const url = "http://localhost:8080";


function feedback(){
  let name = document.getElementById("name-pankaj").value;
  let email = document.getElementById("email-pankaj").value;
  let message = document.getElementById("text-message").value;

  let signdata = {
    name: name,
    email: email,
    message: message,
  };

  fetch(`${url}/feed/savefeedback`, {
    method: "POST",
    body: JSON.stringify(signdata),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      document.getElementById("name-pankaj").value = "";
      document.getElementById("email-pankaj").value = "";
      document.getElementById("text-message").value = "";
      if(res.ok){

          alert("Thanks for reaching out! I'll be happy to help! we will connect soon your mail")
       
        }
     
    })
    .catch((err) => {
      alert("some err")
   
    });
}