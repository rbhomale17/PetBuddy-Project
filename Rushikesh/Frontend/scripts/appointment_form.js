let baseUrl = "https://petbuddy-main-server.onrender.com";
let id = JSON.parse(localStorage.getItem("selectedDoctor"))._id
let userDetails = JSON.parse(localStorage.getItem("userDetails")) || {};
const user_id = userDetails._id;
let appointment_id = ""



async function fetchDummyData() {
    try {
        const response = await fetch(`${baseUrl}/doctor/appointments?id=${id}`);
        //   console.log(response)
        const data = await response.json();
        let doctor__data = data.data
        displaydoctor(doctor__data)
        return data.data.appointments
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}
// Call the fetchDummyData function and display the data
fetchDummyData()
    .then((data) => {
        // console.log(data)
        if (data.length !== 0) {
            displayData(data);
            console.log(data)
        }
        else {
            document.querySelector(".appointment_form").innerHTML = "Dr.did not created any appoiintment slot yet"
        }
    })
    .catch((error) => {
        console.log('Error:', error);
    });

// *****displaying doctor 

function displaydoctor(data) {
    let conntainter = document.querySelector(".doctor_display")
    conntainter.innerHTML = `
      <div class="doctor_display_main">
      <div class="img_div">
        <img src="${data.picture}" alt="">
      </div>
      <div>
        <h4 class="name">Dr.${data.name}</h4>
        <p class="specialization">${data.specialization}</p>
        <p class="email">${data.email}</p>
        <p class="address">${data.address}</p>
      </div>
     </div>
      `


}


// *******displaying doctor


function displayData(data) {
    const container = document.getElementById("bookedslots");
    container.innerHTML = "";

    let currentselectedbutton = null; // Declare currentselectedbutton outside the loop

    data.forEach((el) => {
        if (el) {
            let timestamp = el.meeting_time;
            let date = moment.parseZone(timestamp).format('MMMM Do YYYY, h:mm:ss a');

            console.log(date);
            // let formatedTime = formatMeetingTime(`${el.meeting_time}`);
            const doctorInfo = document.createElement("div");
            doctorInfo.innerHTML = `
                <button class="book-appointment-btn" data-id="${el._id}">${date}</button>
            `;

            let button = doctorInfo.querySelector('.book-appointment-btn');

            if (el.status === true) {
                button.classList.add("red");
                button.addEventListener("click", async (event) => {
                    event.preventDefault();
                    button.innerHTML = "not available";
                });
            } else {
                button.addEventListener("click", async (event) => {
                    event.preventDefault();
                    appointment_id = event.target.dataset.id;
                    console.log(appointment_id);

                    // Reset the previous selected button color to normal
                    if (currentselectedbutton !== null) {
                        currentselectedbutton.classList.remove("green");
                    }

                    // Update the currentselectedbutton to the newly clicked button
                    currentselectedbutton = event.target;
                    currentselectedbutton.classList.add("green");
                });
            }

            container.appendChild(doctorInfo);
        }
    });
}



function formatMeetingTime(dateString) {
    const meetingTime = new Date(dateString);
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedTime = new Intl.DateTimeFormat('en-US', options).format(meetingTime);
    return formattedTime;
}

//   console.log(formatMeetingTime("2023-04-06T09:20:00.000Z"))

function submitForm() {
    const petType = document.getElementById("pet_type").value;
    const petGender = document.getElementById("pets_gender").value;
    if (!petType || !petGender) {
        alert('Please Select Pet Type & Gender.');
        return;
    }
    const formData = {
        pet_type: petType,
        pet_gender: petGender,
        appointment_id: appointment_id,
        user_id: user_id
    };
    console.log(formData)
    // Call the sendPutRequest function to send the form data via PUT request
    sendPutRequest(formData);


    // Clear the form after processing
    document.getElementById("form").reset();
}


document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission (if needed)
    submitForm();
});

async function sendPutRequest(data) {
    try {
        const response = await fetch(`${baseUrl}/doctor/addUserToAppointment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("Booking Accepted!")
            console.log("Data successfully sent!");
            window.location.reload()

        } else {
            console.log("Request failed:", response.status, response.statusText);

        }
    } catch (error) {
        console.log("An error occurred:", error);

    }
}

// navbar js here
let header = document.querySelector("header");
let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    header.classList.toggle("shadow", window.scrollY > 0);
});

menu.onclick = () => {
    navbar.classList.toggle("active");
};
window.onscroll = () => {
    navbar.classList.remove("active");
};

// for name in signup form
let signUser = document.getElementById("username");

signUser.textContent = `${userDetails.name}`;

function logout() {
    localStorage.removeItem("userDetails");
    location.href = "./index.html";
}
