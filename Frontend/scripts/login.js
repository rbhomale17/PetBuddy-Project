const BaseUrl = "https://petbuddy-main-server.onrender.com";
const loginUrl = `${BaseUrl}/users/login`;
let userDetails = JSON.parse(localStorage.getItem('userDetails')) || {};

let emailError = document.getElementById("email-error")
let passwordError = document.getElementById("password-error")
let submitError = document.getElementById("submit-error")

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

    if (passwordInput) {
        console.log("Password is valid.");
        passwordError.innerHTML = '<i class="fas fa-check-circle"></i>';
        return true;
    } else {
        passwordError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-xmark" style="color: #e4503f;"></i>`;
        return false;
    }
}

// validation for form all inputs are working or data provided working fine or not

function validateSubmit() {
    if (!validationPassword() || !validationEmail()) {
        alert(`1. Invalid email format. Please enter a valid email address in the format 'username@example.com'.
                                                         OR
2. Password is invalid. It should have a minimum length of 8 characters, contain at least one letter and one digit, and may include any symbol.`); submitError.innerHTML = "Please fill the data to submit."
        return false
    } else {
        loginUser();
        return true;
    }
}
//submit event created here
var Submitbutton = document.getElementById("Submit");
Submitbutton.addEventListener("click", function (e) {
    e.preventDefault();
    validateSubmit()
})
// catching all input values after validation

var email = document.getElementById("email");
var password = document.getElementById("password");

// posting new Admin user data to server 

function loginUser() {
    let loginUserObject = {
        "password": password.value,
        "email": email.value
    };
    console.log(loginUserObject)
    fetch(`${loginUrl}`, {
        method: "POST",
        headers: {
            "content-Type": "application/json",
        },
        body: JSON.stringify(loginUserObject)
    })
        .then((res) => res.json())
        .then((data) => {
            alert(`${data.msg}`);
            if (data.msg == "User Not Found. Try to Register First") return;
            console.log(data.user);
            if (data.user) localStorage.setItem('userDetails', JSON.stringify(data.user));

            if (data.user.role == "Customer" || data.user.role == "Doctor") alert(`Redirecting to ${data.user.role}'s Dashboard.`), redirectToHome();
            else if (data.user.role == "Admin") alert("Redirecting to Admin Dashboard"), redirectToAdmin();
            // else alert("Redirecting to Sign up Page")//, location.href = "./signup.html"
        }).catch((err) => {
            alert(err)
        })
}

// redirecting to dashboard

function redirectToHome() {
    location.href = "./userDashbord.html";
};
function redirectToAdmin() {
    location.href = "../admin/AdminDashboard.html";
};
