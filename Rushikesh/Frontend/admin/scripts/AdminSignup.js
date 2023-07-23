const BaseUrl = "https://petbuddy-main-server.onrender.com";
const registrationUrl = `${BaseUrl}/users/register`

let firstnameError = document.getElementById("firstname-error")
let mobileError = document.getElementById("mobile-error")
let emailError = document.getElementById("email-error")
let passwordError = document.getElementById("password-error")
let submitError = document.getElementById("submit-error")

// validation for first name from input

function validationFirstName() {
    let name = document.getElementById("name").value;
    const nameInput = /^[A-Za-z\s]+$/.test(name);
    // console.log(nameInput)
    if (nameInput) {
        firstnameError.innerHTML = '<i class="fas fa-check-circle"></i>';
        return true;
    } else {
        firstnameError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-xmark" style="color: #e4503f;"></i>`;
        return false;
    }
}

//validation for email id from input

function validationEmail() {
    let email = document.getElementById("email").value;
    let emailInput = /^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/.test(email);
    // console.log(emailInput)
    if (emailInput) {
        emailError.innerHTML = '<i class="fas fa-check-circle"></i>';
        return true;
    } else {
        emailError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-xmark" style="color: #e4503f;"></i>`;
        return false;
    }
}

// validation for password from input

function validationPassword() {
    let password = document.getElementById("password").value;
    const passwordInput = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@!#$%^&*()-=_+[\]{}|\\;:'",.<>/?`~]{8,}$/.test(password);
    // console.log(password, passwordInput)
    if (passwordInput) {
        // console.log("Password is valid.");
        passwordError.innerHTML = '<i class="fas fa-check-circle"></i>';
        return true;
    } else {
        // alert("Password is invalid. It should have a minimum length of 8 characters, contain at least one letter and one digit, and may include any symbol.");
        passwordError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-xmark" style="color: #e4503f;"></i>`;
        return false;
    }
}

// validation for mobile from input

function validationMobile() {
    let mobile = document.getElementById("mobile").value;
    if (mobile != "") {
        const mobileNumberRegex = /^[0-9]{10}$/.test(mobile)
        if (mobileNumberRegex) {
            // console.log("Mobile is Valid.");
            mobileError.innerHTML = '<i class="fas fa-check-circle"></i>';
            return true;
        } else {
            // alert("Mobile No. is Invalid, It Must Be of 10 Digits.");
            mobileError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-xmark" style="color: #e4503f;"></i>`;
            return false;
        }
    } else {
        mobileError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-xmark" style="color: #e4503f;"></i>`;
        return false;
    }
}
// validation for form all inputs are working or data provided working fine or not

// let flag = false;
// catching all input values after validation
var username = document.getElementById("name");
var mobile = document.getElementById("mobile");
var email = document.getElementById("email");
var password = document.getElementById("password");
// let address = document.getElementById("address").value;

function validateSubmit() {
    if (!validationPassword() || !validationEmail() || !validationMobile() || !validationFirstName()) {
        alert(`1. Mobile No. is Invalid, It Must Be of 10 Digits Only.
2. Address is Invalid, Minimun 4 character required.
                                                        OR
3. Password is invalid. It should have a minimum length of 8 characters, contain at least one letter and one digit, and may include any symbol.`);
        // alert("Password is invalid. It should have a minimum length of 8 characters, contain at least one letter and one digit, and may include any symbol.");
        submitError.innerHTML = "Please fill correct Data."
        return false;
    } else {
        // flag = true;
        let newUserObject = {
            "name": username.value,
            "password": password.value,
            "mobile": mobile.value,
            "picture": `https://meeteasy-main-server.onrender.com/photos/files/64b7b692a15d975b2682f292`,
            "email": email.value,
            "role": 'Admin'
        };
        console.log(newUserObject)
        registerUser(newUserObject)
        // RegisterUser();
        return true;
    }
}
//submit event created here

var Submitbutton = document.getElementById("Submit");
Submitbutton.addEventListener("click", function (e) {
    e.preventDefault();
    validateSubmit();
})



// posting new user data to server
async function registerUser(newUserObject) {
    try {
        const registrationResponse = await fetch(`${registrationUrl}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUserObject),
        });

        const registrationData = await registrationResponse.json();
        alert(`${registrationData.msg}`);
        console.log(registrationData.user);

        const welcomeResponse = await fetch(`${BaseUrl}/mail/welcome-user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: registrationData.user.email }),
        });

        const welcomeData = await welcomeResponse.json();
        alert(welcomeData.msg);
    } catch (error) {
        console.error("Error occurred:", error);
    }
}

// // redirecting to dashboard

// function redirectToLogin() {
//     location.href = "./landing.html";
// };
