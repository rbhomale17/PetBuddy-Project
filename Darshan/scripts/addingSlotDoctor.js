let userDetails = JSON.parse(localStorage.getItem("userDetails")) || {};
let baseUrl = "http://localhost:3000"
let doctor_data = JSON.parse(localStorage.getItem("selectedDoctor"))
// console.log(doctor_data)
let card = `
    <div>
        <img class="profile-pic" src=${doctor_data.picture.url} alt="Profile Picture">
    </div>
    <div>
        <div class="name">${doctor_data.name}</div>
        <div class="specialization">${doctor_data.specialization}</div>
        <div class="address">${doctor_data.address}</div>
        <div class="contact">
        Email: ${doctor_data.email}<br>
        Mobile: ${doctor_data.Mobile}
        </div>    
    </div>
`
document.getElementById("doctor_data").innerHTML = (card)
// 2023-04-06T10:20:00.000Z
let timeArray = [9,10,11,12,13,14,15,16,17,18]
let timeButtonsContainer = document.getElementById("slot_btn")
timeArray.forEach(time => {
    const todayDate = new Date().toISOString().substring(0, 10)
    const button = document.createElement("button");
    button.classList = "slot_buttons"
    button.innerText = `${todayDate}, Time: ${time}:00`;

    let formatedTime = `${todayDate}T${time}:00:00:000Z`

    // Add a click event listener to the button
    button.addEventListener("click", async() => {
        console.log(formatedTime)
        createSlots(formatedTime,doctor_data._id)
    });

    // Append the button to the container
    timeButtonsContainer.appendChild(button);
  });


  async function createSlots(meeting_time,doctor_id){
    try {
        const response = await fetch(`${baseUrl}/doctor/addappointment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                meeting_time,
                doctor_id
            })
        });

        if (response.ok) {
            alert("Slot Created Successfully!")
            console.log("Slot Created successfully!");
            // Do something after successful request, e.g., show a success message
        } else {
            console.log("Request failed:", response.status, response.statusText);
            // Handle error scenarios here, e.g., show an error message
        }
    } catch (error) {
        console.log("An error occurred:", error);
        // Handle any network or other errors
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
  location.href = "index.html";
}
