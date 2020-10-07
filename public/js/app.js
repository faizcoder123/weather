const form         = document.querySelector('form')
const search      = document.querySelector('input')
const messageOne  = document.querySelector('#message-1')
const messageTwo  = document.querySelector('#message-2')

form.addEventListener('submit', (e) => {
//      console.log("inside")
     e.preventDefault()// prevent reefrshing when click submit

    const location = search.value

    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''  //clear last qury from page first..
    // to fetch jason data and display it
    fetch('/weather?address=' + location).then((response) => {//fetch from this api and run promise
        response.json().then((data) => { // use json data and display
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.address
                messageTwo.textContent = data.forecast
            }
        })
    })
})
