
var form = document.getElementById("subscribeForm")
var username = document.getElementById("username")
var email = document.getElementById("email")
var password = document.getElementById("password")
var success = document.getElementById("successMsg")

// display error messages
usernameError = document.getElementById("usernameError")
emailError = document.getElementById("emailError")
passwordError = document.getElementById("passwordError")

username.addEventListener("focusout", (event) => {
    if(username.validity.valueMissing) {
        usernameError.innerText = "Username is required"
        username.style.border = "1px solid red"
    } else {
        username.style.border = "2px solid lawngreen"
    }
})

username.addEventListener("focusin", (event) => {
    username.style.border = "2px solid grey"
    usernameError.innerText = ""
})

email.addEventListener("focusout", (event) => {
    if(email.validity.valueMissing) {
        emailError.innerText = "Email is required"
        email.style.border = "1px solid red"
        console.log("email")
    } else if(email.validity.type) {
        emailError.innerText = "Email not valid"
        email.style.border = "1px solid red"
    } else {
        email.style.border = "2px solid lawngreen"
    }
})

email.addEventListener("focusin", (event) => {
    email.style.border = "2px solid grey"
    emailError.innerText = ""
})

password.addEventListener("focusout", (event) => {
    if(password.validity.valueMissing) {
        passwordError.innerText = "Password is required"
        password.style.border = "1px solid red"
    }else if(password.validity.tooShort) {
        passwordError.innerText = "Password should be atleast 8 characters long"
        password.style.border = "1px solid red"
    } else {
        password.style.border = "2px solid lawngreen"
    }
})

password.addEventListener("focusin", (event) => {
    password.style.border = "2px solid grey"
    passwordError.innerText = ""
})


form.addEventListener("submit", (event) => {
    event.preventDefault()

    if(username.value == "") {
        usernameError.innerText = "Username is required"
    } else if(email.value == "") {
        emailError.innerText = "Email is required"
    }else if(password.value == "") {
        passwordError.innerText = "Password is required"
    } else {
        
        var dataToSend = {
            'username': username.value,
            'email': email.value,
            'password': password.value
        }

        fetch('http://localhost:3000/subscribers/', {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        })
            .then(response => response.json())
            .then((data) => {
                console.log("data RECEIVED")
                var tbody = document.getElementById('table-body')

                var row = `<tr>
                            <td></td>
							<td>${data.username}</td>
							<td>${data.email}</td>
							<td><button id='del'>Delete</button></td>
					  </tr>`
                tbody.innerHTML += row
            })
            .catch((error) => {
                console.error('Error encoutered:', error)
            })

        // Set everything back to normal
        username.value = ""
        email.value = ""
        password.value = ""

        username.style.border = "2px solid grey"
        password.style.border = "2px solid grey"
        email.style.border = "2px solid grey"
    }

})

//---------------------- GET DATA FROM DB AND POPULATE TABLE
function getData () {
    fetch('http://localhost:3000/subscribers/', {
            method: 'GET',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((data) => {
                var tbody = document.getElementById('table-body')

                data.forEach(element => {
                    var row = `<tr id="${username}">
                            <td class="idVal">${element.id}</td>
							<td>${element.username}</td>
							<td>${element.email}</td>
							<td><button id='del' onClick=deleteSubscriber()>Delete</button></td>
					  </tr>`
                    tbody.innerHTML += row
                });
            })
            .catch((error) => {
                console.error('Error encoutered:', error)
            })
}
getData()

// Delete records from the db 
function deleteSubscriber() {
    const delButton = document.getElementById('del')

    var td = delButton.parentElement
    var tr = td.parentElement
    var id = tr.firstChild.nextElementSibling.innerText
    tr.remove()

    fetch(`http://localhost:3000/subscribers/${id}`, {
            method: 'DELETE',
            mode: 'cors',
            credentials: 'same-origin',
    })
        .then(response => response.json())
        .then((data) => {
            console.log(data.message)
        });
}





