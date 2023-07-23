let userDetails = JSON.parse(localStorage.getItem("userDetails")) || {};
let doctorDetail = JSON.parse(localStorage.getItem("selectedDoctor")) || {};

const user_id = userDetails._id;
const baseUrl = "http://localhost:3000/doctor/appointments";

// Function to fetch the Appointmet data
async function fetchAppointmentData() {
  try {
    console.log(user_id);
    const response = await fetch(
      `http://localhost:3000/doctor/appointments?id=${userDetails._id}`
    );
    const data = await response.json();
    console.log("Data from API:", data); // Check the structure of data here
    if (data.data && data.data.appointments) {
      displayData(data.data.appointments);
    } else {
      console.error("Invalid response data format.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

// Function to display the data

fetchAppointmentData();

function displayData(data) {
  console.log(data);
  const container = document.getElementById("data-container");
  if (!container) {
    console.error("Error: data-container element not found.");
    return;
  }

  container.innerHTML = ""; // Clear the container before adding new data
  console.log(data);
  data.forEach((user) => {
    const doctorInfo = document.createElement("div");
    let formatedDate = convertISO8601ToDateTime(`${user.meeting_time}`);
    doctorInfo.innerHTML = `
       
       <img  class="imageY" src="https://orlandodermatologycenter.com/wp-content/uploads/2015/12/doctor-2.jpg" alt="Dr Image"/>
          <h2 class="Drname">Name: Dr Salunke</h2>
       <p class="EmailY">Email:abc@gmail.com</p>
       <p class="AddressY">Address:xyz</p>
          <p class="Mobile">Mobile No: 8605268227</p>
          <p>Time: ${formatedDate}</p>
      <a href=${user.meeting_link}><button class="view-appointment-btn" >Join Meet</button></a>
   
    `;
    container.appendChild(doctorInfo);
    const imgY = doctorInfo.querySelector(".imageY");
    imgY.setAttribute("src", doctorDetail.picture.url);
    const drName = doctorInfo.querySelector(".Drname");
    drName.innerText = `Name: Dr. ${doctorDetail.name}`;
    const email = doctorInfo.querySelector(".EmailY");
    email.innerText = `Email: ${doctorDetail.email}`;
    const mobile = doctorInfo.querySelector(".Mobile");
    mobile.innerText = `Mobile No: ${doctorDetail.mobile}`;
    const AddressY = doctorInfo.querySelector(".AddressY");
    AddressY.innerText = `Address : ${doctorDetail.address}`;
  });
}

function convertISO8601ToDateTime(iso8601Str) {
  const dtObj = new Date(iso8601Str);

  // Function to add leading zero if the value is less than 10
  const addLeadingZero = (value) => (value < 10 ? "0" + value : value);

  const date =
    dtObj.getUTCFullYear() +
    "-" +
    addLeadingZero(dtObj.getUTCMonth() + 1) +
    "-" +
    addLeadingZero(dtObj.getUTCDate());
  const time =
    addLeadingZero(dtObj.getUTCHours()) +
    ":" +
    addLeadingZero(dtObj.getUTCMinutes()) +
    ":" +
    addLeadingZero(dtObj.getUTCSeconds());

  return { date, time };
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
