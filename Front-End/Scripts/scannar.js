

const scanner = new Html5QrcodeScanner('reader', {
    qrbox: {
        width: 450,
        height: 450
    },
    fps: 20

});



scanner.render(success, error);


function success(result) {

    console.log(result)

    document.getElementById('result').innerHTML = `

                <h2>Success</h2>
                <p><a href="${result}">${result}</a></p>
            
            `

    scanner.clear()

    document.getElementById('reader').remove()
    document.getElementById('backbtn').style.display = 'block'

}

function error(err) {
    console.error(err)
}


function handleback(){
    location.reload()
}