

// QR Option tabs 

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}




// Select Design Images

const designImagesHTML = `<div class="main-container">
<h2>Select your favourite Design</h2>
<div class="radio-buttons">
    <label class="custom-radio">
        <input type="radio" name="design" value="blue" checked />
        <span class="radio-btn"><i class="las la-check"></i>
            <img src="../images/qr-design/blue-1.png" alt="">

        </span>
    </label>
    <label class="custom-radio">
        <input type="radio" name="design" value="black" />
        <span class="radio-btn"><i class="las la-check"></i>
            <img src="../images/qr-design/black-2.png" alt="">
        </span>
    </label>
    <label class="custom-radio">
        <input type="radio" name="design" value="pink" />
        <span class="radio-btn"><i class="las la-check"></i>
            <img src="../images/qr-design/pink-3.png" alt="">
        </span>
    </label>
    <label class="custom-radio">
        <input type="radio" name="design" value="brown" />
        <span class="radio-btn"><i class="las la-check"></i>
            <img src="../images/qr-design/brown-4.png" alt="">
        </span>
    </label>
    <label class="custom-radio">
        <input type="radio" name="design" value="red" />
        <span class="radio-btn"><i class="las la-check"></i>
            <img src="../images/qr-design/red-5.png" alt="">
        </span>
    </label>
    <label class="custom-radio">
        <input type="radio" name="design" value="crimson" />
        <span class="radio-btn"><i class="las la-check"></i>
            <img src="../images/qr-design/chrimston-6.png" alt="">
        </span>
    </label>
</div>
</div>
`
const qr_select_designEl = document.querySelectorAll('.qr_select_design');
for(let el of qr_select_designEl){
    el.innerHTML = designImagesHTML
}


const design = document.getElementsByName('design');
console.log(design);
for (d of design) {
    d.addEventListener("change", (event) => {
        console.log(event.target.value);
    })
}

