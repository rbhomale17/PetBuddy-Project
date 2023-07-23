let email = document.getElementById("email");
var Submitbutton = document.getElementById("Submit");
Submitbutton.addEventListener("click", function (e) {
    e.preventDefault();
    // validateSubmit();
    if (validationEmail()) {
        let obj = {
            email: email.value
        }
        fetch(`https://petbuddy-main-server.onrender.com/mail/forgot-password`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then((data) => data.json()).then((data) => {
            alert(data.msg)
        }).catch((err) => {
            console.log(err)
        })
    } else {
        alert("Invalid email format. Please enter a valid email address in the format 'username@example.com'.")
    }
})

function validationEmail() {
    let emailError = document.getElementById("email-error")
    let email = document.getElementById("email").value;
    let emailInput = /^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/.test(email);
    console.log(emailInput, email)
    if (emailInput) {
        emailError.innerHTML = '<i class="fas fa-check-circle"></i>';
        return true;
    } else {
        emailError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-xmark" style="color: #e4503f;"></i>`;
        return false;
    }
}
