//  text message open

const BaseUrl_chatbot = `https://angry-cummerbund-newt.cyclic.app`

// const url = "http://localhost:3000";

// let signbtn = document.getElementById("btn-pankaj");
function savedata() {
  let name = document.getElementById("name-pankaj").value;
  let email = document.getElementById("email-pankaj").value;
  let pass = document.getElementById("text-message").value;

  let signdata = {
    name: name,
    email: email,
    message: pass,
  };

  fetch(`${BaseUrl_chatbot}/feed/savefeedback`, {
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
      if (res.ok) {
        alert(
          "Thanks for reaching out! I'll be happy to help! we will connect to you soon on your mail"
        );
        document.getElementById("fom-pankaj").style.display = "none";
      }
    })
    .catch((err) => {
      console.log(err)
      document.getElementById("fom-pankaj").style.display = "none";
    });
}

function showdiv() {
  document.getElementById("fom-pankaj").style.display = "block";
}
function hidediv() {
  document.getElementById("fom-pankaj").style.display = "none";
}

//  chat box starts
var audio = new Audio("../assets/sentmessage.mp3");

function startFunction() {
  setLastSeen();
  waitAndResponce("intro");
}

function setLastSeen() {
  var date = new Date();
  var lastSeen = document.getElementById("lastseen");
  lastSeen.innerText =
    "last seen today at " + Date(Date.now()).slice(16).slice(0, 5);
}

function closeFullDP() {
  var x = document.getElementById("fullScreenDP");
  if (x.style.display === "flex") {
    x.style.display = "none";
  } else {
    x.style.display = "flex";
  }
}

function openFullScreenDP() {
  var x = document.getElementById("fullScreenDP");
  if (x.style.display === "flex") {
    x.style.display = "none";
  } else {
    x.style.display = "flex";
  }
}

function isEnter(event) {
  if (event.keyCode == 13) {
    sendMsg();
  }
}

function sendMsg() {
  var input = document.getElementById("inputMSG");
  var ti = input.value;
  if (input.value == "") {
    return;
  }
  var date = new Date();
  var myLI = document.createElement("li");
  var myDiv = document.createElement("div");
  var greendiv = document.createElement("div");
  var dateLabel = document.createElement("label");
  dateLabel.innerText = Date(Date.now()).slice(16).slice(0, 5);
  myDiv.setAttribute("class", "sent");
  greendiv.setAttribute("class", "green");
  dateLabel.setAttribute("class", "dateLabel");
  greendiv.innerText = input.value;
  myDiv.appendChild(greendiv);
  myLI.appendChild(myDiv);
  greendiv.appendChild(dateLabel);
  document.getElementById("listUL").appendChild(myLI);
  var s = document.getElementById("chatting");
  s.scrollTop = s.scrollHeight;
  setTimeout(function () {
    waitAndResponce(ti);
  }, 1500);
  input.value = "";
  playSound();
}

function waitAndResponce(inputText) {
  var lastSeen = document.getElementById("lastseen");
  lastSeen.innerText = "typing...";
  var name = "";
  if (inputText.toLowerCase().includes("my name is")) {
    name = inputText.substring(inputText.indexOf("is") + 2);
    if (name.toLowerCase().includes("varshith")) {
      sendTextMessage("Ohh! That's my name too");
    }
    inputText = "input";
  }
  switch (inputText.toLowerCase().trim()) {
    case "intro":
      setTimeout(() => {
        sendTextMessage(
          "Hello there 👋🏻,<br><br>From <span class='bold'><a class='alink'>QR Insight</a>.</span><br><br>Send <span class='bold'>'help'</span> to know more about me.<br>"
        );
      }, 2000);
      break;

    case "help":
      sendTextMessage(
        "<span class='sk'>Send Keyword to get what you want to know about me...<br>QR<br><span class='bold'>'Whatsapp'</span> -How do I create a Whatspp QR Code? <br><span class='bold'>'Design'</span> -How to create a designer QR Code <br><span class='bold'>'about'</span> - What is this website about?<br><span class='bold'>' generate'</span> - How do I generate a QR code?<br><span class='bold'>'customize'</span> -Can I customize the QR code?<br><span class='bold'>'download'</span> - How do I download the QR code?<br><span class='bold'>'limit'</span> - What is the maximum size limit for generating a QR code?<br><span class='bold'>'commercial'</span> -Can I use the generated QR code for commercial purposes?<br><span class='bold'>'scan'</span> -How do I scan a QR code?<br><span class='bold'>'encode'</span> - What kind of information can I encode in a vCard QR code?<br><span class='bold'>'profile'</span> -Can I generate a QR code for a social media profile?<br><span class='bold'>'use'</span> - How do I use the UPI QR code?<br><span class='bold'>'clear'</span> - to clear conversation<br><span class='bold'>'Error'</span> -Why is my QR Code not working anymore?<br>"
      );
      break;
    case "about":
      sendTextMessage(
        "<span class='sk'>This website generates QR codes for various features like text, link, UPI, WhatsApp, vCard, Zoom, email, phone, and Wi-Fi."
      );
      break;
    case "generate":
      sendTextMessage(
        "<span class='sk'>To generate a QR code, simply select the feature you want to encode, enter the relevant information, and click on the  button"
      );
      break;
    case "customize":
      sendTextMessage(
        "<span class='sk'>Yes, you can customize the color and background of the QR code to make it more personalized."
      );
      break;
    case "download":
      sendTextMessage(
        "<span class='sk'>After generating the QR code, click on the Download button to download the QR code."
      );
      break;
    case "limit":
      sendTextMessage(
        "<span class='sk'>The maximum size limit for generating a QR code is 500 characters."
      );
      break;
    case "commercial":
      sendTextMessage(
        "<span class='sk'>Yes, you can use the generated QR code for commercial purposes."
      );
      break;
    case "scan":
      sendTextMessage(
        "<span class='sk'>To scan a QR code, simply open your phone's camera app and point it at the code. Your phone will automatically recognize the code and take you to the relevant webpage or app"
      );
      break;
    case "encode":
      sendTextMessage(
        "<span class='sk'> You can encode information such as name, phone number, email address, company name, job title, and address in a vCard QR code."
      );
      break;
    case "profile":
      sendTextMessage(
        "<span class='sk'>Yes, you can generate a QR code for your social media profile by selecting the link feature and entering your social media profile link."
      );
      break;
    case "use":
      sendTextMessage(
        "<span class='sk'>You can use the UPI QR code to make payments by scanning the code using a UPI-enabled app on your phone."
      );
      break;
    case "design":
      sendTextMessage(
        "<span class='sk'>With our service you have various design options to make your WeChat QR Code to look more beautiful. The following screenshot shows a transparent QR Code with a logo behind the QR Code:"
      );
      break;
    case "whatsapp":
      sendTextMessage(
        "<span class='sk'>Paste the URL in the QR Code Generator to retrieve the QR Code for the WeChat official account.</span><br>"
      );
      break;

    case "error":
      sendTextMessage(
        "If you signed up for a trial your account gets deactivated if you do not subscribe after the trial period. You will need to reactivate the accountIf you have an open invoice for more than 60 days, the QR Code will not redirect and will display an error message.You will need to reactivate the account and pay the open invoice."
      );
      break;
    case "ok":
      sendTextMessage(
        "Hello there 👋🏻,<br>Thanks for reaching out! I'll be happy to help Is there any specific information or questions you need help with?"
      );
      break;
    case "thank you":
      sendTextMessage(
        "Hello there 👋🏻,<br>Thanks for reaching out! I'll be happy to help Is there any specific information or questions you need help with?"
      );
      break;

    case "clear":
      clearChat();
      break;

    case "time":
      var date = new Date();
      sendTextMessage(
        "Current time is " + date.getHours() + ":" + date.getMinutes()
      );
      break;

    case "date":
      var date = new Date();
      sendTextMessage(
        "Current date is " +
          date.getDate() +
          "/" +
          date.getMonth() +
          "/" +
          date.getFullYear()
      );
      break;

    case "hai":
      sendTextMessage("Hello there 👋🏻");
      sendTextMessage(
        "<span class='sk'>Send Keyword to get what you want to know about me...<br>QR<br><span class='bold'>'Whatsapp'</span> -How do I create a Whatspp QR Code? <br><span class='bold'>'Design'</span> -How to create a QR Code Business Card<br><span class='bold'>'Error'</span> -Why is my QR Code not working anymore?<br><span class='bold'>'clear'</span> - to clear conversation<br>"
      );
      break;
    case "hello":
      sendTextMessage("Hello there 👋🏻");
      sendTextMessage(
        "<span class='sk'>Send Keyword to get what you want to know about me...<br>QR<br><span class='bold'>'Whatsapp'</span> -How do I create a Whatspp QR Code? <br><span class='bold'>'Design'</span> -How to create a QR Code Business Card<br><span class='bold'>'Error'</span> -Why is my QR Code not working anymore?<br><span class='bold'>'clear'</span> - to clear conversation<br>"
      );
      break;

    case "hi":
      sendTextMessage("Hello there 👋🏻");
      sendTextMessage(
        "<span class='sk'>Send Keyword to get what you want to know about me...<br>QR<br><span class='bold'>'Whatsapp'</span> -How do I create a Whatspp QR Code? <br><span class='bold'>'Design'</span> -How to create a QR Code Business Card<br><span class='bold'>'Error'</span> -Why is my QR Code not working anymore?<br><span class='bold'>'clear'</span> - to clear conversation<br>"
      );
      break;

    case "hey":
      sendTextMessage("Hello there 👋🏻");
      sendTextMessage(
        "<span class='sk'>Send Keyword to get what you want to know about me...<br>QR<br><span class='bold'>'Whatsapp'</span> -How do I create a Whatspp QR Code? <br><span class='bold'>'Design'</span> -How to create a QR Code Business Card<br><span class='bold'>'Error'</span> -Why is my QR Code not working anymore?<br><span class='bold'>'clear'</span> - to clear conversation<br>"
      );
      break;

    case "hy":
      sendTextMessage("Hello there 👋🏻");
      sendTextMessage(
        "<span class='sk'>Send Keyword to get what you want to know about me...<br>QR<br><span class='bold'>'Whatsapp'</span> -How do I create a Whatspp QR Code? <br><span class='bold'>'Design'</span> -How to create a QR Code Business Card<br><span class='bold'>'Error'</span> -Why is my QR Code not working anymore?<br><span class='bold'>'clear'</span> - to clear conversation<br>"
      );
      break;

    case "qr-insight":
      sendTextMessage("Yes, that's me");
      break;
    case "qr":
      sendTextMessage("Yes, that's me");
      break;
    case "qr-code":
      sendTextMessage("Yes, that's me");
      break;

    case "github":
      sendTextMessage(
        "You can check my github here <a target='_blank' href='https://github.com/Niteshthori24198/substantial-money-3994'>QR Insight</a>"
      );
      break;
    case "linkedin":
      sendTextMessage(
        "You can check my linkedin here <a target='_blank' href='https://www.linkedin.com/in/pankaj-jain-a5586621b/'>Pankaj jain</a>"
      );
      break;
    case "friends":
    case "friend":
      sendTextMessage("I am always ready to make new friends");
      break;
    case "input":
      setTimeout(() => {
        // sendTextMessage("What a coincidence!");
        sendTextMessage("Hello " + name + "! How are you?");
      }, 2000);

      break;
    default:
      setTimeout(() => {
        sendTextMessage(
          "Hey I couldn't catch you...😢<br>Send 'help' to know more about usage.if you have other Query so please click other Query option"
        );
      }, 2000);
      break;
  }
}

function clearChat() {
  document.getElementById("listUL").innerHTML = "";
  waitAndResponce("intro");
}

function sendTextMessage(textToSend) {
  setTimeout(setLastSeen, 1000);
  var date = new Date();
  var myLI = document.createElement("li");
  var myDiv = document.createElement("div");
  var greendiv = document.createElement("div");
  var dateLabel = document.createElement("label");
  dateLabel.setAttribute("id", "sentlabel");
  dateLabel.id = "sentlabel";
  dateLabel.innerText = Date(Date.now()).slice(16).slice(0, 5);
  myDiv.setAttribute("class", "received");
  greendiv.setAttribute("class", "grey");
  greendiv.innerHTML = textToSend;
  myDiv.appendChild(greendiv);
  myLI.appendChild(myDiv);
  greendiv.appendChild(dateLabel);
  document.getElementById("listUL").appendChild(myLI);
  var s = document.getElementById("chatting");
  s.scrollTop = s.scrollHeight;
  playSound();
}

function sendResponse() {
  setTimeout(setLastSeen, 1000);
  var date = new Date();
  var myLI = document.createElement("li");
  var myDiv = document.createElement("div");
  var greendiv = document.createElement("div");
  var dateLabel = document.createElement("label");
  dateLabel.innerText = Date(Date.now()).slice(16).slice(0, 5);
  myDiv.setAttribute("class", "received");
  greendiv.setAttribute("class", "grey");
  dateLabel.setAttribute("class", "dateLabel");
  greendiv.innerText = " ";
  myDiv.appendChild(greendiv);
  myLI.appendChild(myDiv);
  greendiv.appendChild(dateLabel);
  document.getElementById("listUL").appendChild(myLI);
  var s = document.getElementById("chatting");
  s.scrollTop = s.scrollHeight;
  playSound();
}

function playSound() {
  audio.play();
}

//
