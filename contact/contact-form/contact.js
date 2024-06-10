// contact.js - Creating a working contact form!
// Author: Alexandru Wechsler
// Credits: Chat GBT + codebrainer.com 🤍
// Date: June 2024

var fields = {};

//When you are working with a lot of fields, it makes sense to connect them in a group.
document.addEventListener("DOMContentLoaded", function() {
    fields.firstName = document.getElementById('firstName');
    fields.lastName = document.getElementById('lastName');
    fields.email = document.getElementById('email');
    fields.message = document.getElementById('message');
   })

//Check input values so that data is clear and running code doesn't fail and make me sad!

//Checking that a field isn't empty
function isNotEmpty(value) {
    if (value == null || typeof value == 'undefined' ) return false;
    return (value.length > 0);
   }

//Checking that string is an email
function isEmail(email) {
    let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(String(email).toLowerCase());
   }

//field validation
function fieldValidation(field, validationFunction) {
    if (field == null) return false;

    let isFieldValid = validationFunction(field.value)
    if (!isFieldValid) {
        field.className = 'placeholderRed';
    } else {
        field.className = '';
    }

    return isFieldValid;
}

//validation of all fields
function isValid() {
    var valid = true;
    
    valid &= fieldValidation(fields.firstName, isNotEmpty);
    valid &= fieldValidation(fields.lastName, isNotEmpty);
    valid &= fieldValidation(fields.email, isEmail);
    valid &= fieldValidation(fields.message, isNotEmpty);
   
    return valid;
   }

//Sending contact form
class User {
    constructor(firstName, lastName, email, message) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.message = message;
}
}

function sendContact() {
    if (isValid()) {
        let usr = new User(fields.firstName.value, fields.lastName.value, fields.email.value, fields.message.value);

        //sending request to server
        fetch('http://localhost:3000/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usr)
        })
        .then(response => response.json())
        .then(data => {
            alert(`${usr.firstName}, thanks for your message.`);
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("There was an error when sending your message. Please make sure you used letters, no symbols or numbers, when inputing your first and last name. Also make sure you used a valid email address.");
        });

    } else {
        alert("There was an error when sending your message. Please make sure you used letters, no symbols or numbers, when inputing your first and last name. Also make sure you used a valid email address.")
    }
}
