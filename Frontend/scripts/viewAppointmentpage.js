let userDetails = JSON.parse(localStorage.getItem("userDetails")) || {};
let doctorDetail = JSON.parse(localStorage.getItem("selectedDoctor")) || {};

const user_id = userDetails._id;
const baseUrl = "https://petbuddy-main-server.onrender.com/doctor/appointments";

// Function to fetch the Appointmet data
async function fetchAppointmentData() {
  try {
    // console.log(user_id);
    const response = await fetch(
      `https://petbuddy-main-server.onrender.com/doctor/userAppointments?id=${userDetails._id}`
    );
    const data = await response.json();
    console.log("Data from API:", data); // Check the structure of data here
    if (data.data && data.data.appointments) {
      // console.log(data.data.appointments[0].doctor_id);
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
  // console.log(data);
  const container = document.getElementById("data-container");
  if (!container) {
    console.error("Error: data-container element not found.");
    return;
  }

  container.innerHTML = ""; // Clear the container before adding new data
  // console.log(data);
  data.forEach((user) => {
    // console.log(user.doctor_id);
    const doctorInfo = document.createElement("div");
    // let formatedDate = convertISO8601ToDateTime(`${user.meeting_time}`);
    let timestamp = user.meeting_time;
    let date = moment.parseZone(timestamp).format('MMMM Do YYYY, h:mm:ss a');

    // console.log(date);
    doctorInfo.innerHTML = `
       
       <img  class="imageY" src="https://orlandodermatologycenter.com/wp-content/uploads/2015/12/doctor-2.jpg" alt="Dr Image"/>
          <h2 class="Drname">Name: Dr Salunke</h2>
       <p class="EmailY">Email:abc@gmail.com</p>
       <p class="AddressY">Address:xyz</p>
          <p class="Mobile">Mobile No: 8605268227</p>
          <p>Time:<b> ${date}</b></p>
      <a href=${user.meeting_link}><button class="view-appointment-btn" >Join Meet</button></a>
   
    `;
    container.appendChild(doctorInfo);
    const imgY = doctorInfo.querySelector(".imageY");
    imgY.setAttribute("src", user.doctor_id.picture);
    const drName = doctorInfo.querySelector(".Drname");
    drName.innerText = `Name: Dr. ${user.doctor_id.name}`;
    const email = doctorInfo.querySelector(".EmailY");
    email.innerText = `Email: ${user.doctor_id.email}`;
    const mobile = doctorInfo.querySelector(".Mobile");
    mobile.innerText = `Mobile No: ${user.doctor_id.mobile}`;
    const AddressY = doctorInfo.querySelector(".AddressY");
    AddressY.innerText = `Address : ${user.doctor_id.address}`;
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
  location.href = "./index.html";
}
