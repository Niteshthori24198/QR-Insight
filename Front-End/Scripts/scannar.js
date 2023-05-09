
// const BaseUrl_scannar = `https://angry-cummerbund-newt.cyclic.app`

const scanner = new Html5QrcodeScanner('reader', {
    qrbox: {
        width: 450,
        height: 450
    },
    fps: 20

});



scanner.render(success, error);


function success(result) {

    // console.log(result)

    if (result.startsWith('BEGIN:VCARD') && result.endsWith('END:VCARD')) {
        const data = result.split('\n')
        // console.log(data);
        const htmlData = data.map((ele, i) => {
            if (i > 1 && i <= (data.length - 2)) {
                if (ele.startsWith('URL')) {

                    return `<a href="${ele.slice(4)}">${ele}</p>`

                } else {
                    // console.log(ele.split(':'))
                    const a = ele.split(':')
                    if (a.length >= 2 && a[1] !== '')
                        return `<p>${ele}</p>`
                    else
                        return ''
                }
            } else {
                return ''
            }
        }).join('')
        document.getElementById('result').innerHTML = `<h2>Success</h2>
        ${htmlData}`;

    } else {

        document.getElementById('result').innerHTML = `<h2>Success</h2>
                    <p><a href="${result}" id="QR_redirect">${result}</a></p>`;

        document.getElementById('QR_redirect').click()

    }


    scanner.clear()

    document.getElementById('reader').remove()
    document.getElementById('backbtn').style.display = 'block'


}

function error(err) {
    console.error(err)
}


function handleback() {
    location.reload()
}