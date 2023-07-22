let userDetails = JSON.parse(localStorage.getItem("userDetails")) || {};
let doctorDetail = JSON.parse(localStorage.getItem("selectedDoctor")) || {};

const user_id = userDetails._id;
const baseUrl = "http://localhost:3000/doctor/appointments";
// let data = [
//   {
//     name: "John Doe",
//     email: "john@example.com",
//     mobile: 1234567890,
//     role: "Customer",
//     password: "password123",
//     picture: {
//       url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR27sFJreSiqEOAMqqHo3lkHyi1SE4MzAKUKg&usqp=CAU",
//     },
//     address: "123, Elm Street",
//     language: "English",
//     appointments: ["appointment_id_1", "appointment_id_2"],
//     specialization: "Veterinary Nutrition",
//   },
//   {
//     name: "Jane Smith",
//     email: "jane@example.com",
//     mobile: 9876543210,
//     role: "Admin",
//     password: "pass1234",
//     picture: {
//       url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR27sFJreSiqEOAMqqHo3lkHyi1SE4MzAKUKg&usqp=CAU",
//     },
//     address: "456, Oak Avenue",
//     language: "Spanish",
//     appointments: ["appointment_id_3"],
//     specialization: null,
//   },
//   {
//     name: "Dr. Alex Johnson",
//     email: "alex@example.com",
//     mobile: 7418529630,
//     role: "Doctor",
//     password: "doctorPass",
//     picture: {
//       url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR27sFJreSiqEOAMqqHo3lkHyi1SE4MzAKUKg&usqp=CAU",
//     },
//     address: "789, Maple Road",
//     language: "English",
//     appointments: ["appointment_id_4", "appointment_id_5"],
//     specialization: "Veterinary Pathology",
//   },
//   {
//     name: "Mary Brown",
//     email: "mary@example.com",
//     mobile: 1112223333,
//     role: "Customer",
//     password: "mypass987",
//     picture: {
//       url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR27sFJreSiqEOAMqqHo3lkHyi1SE4MzAKUKg&usqp=CAU",
//     },
//     address: "999, Pine Lane",
//     language: "French",
//     appointments: ["appointment_id_6"],
//     specialization: null,
//   },
//   {
//     name: "Dr. Sarah Lee",
//     email: "sarah@example.com",
//     mobile: 8889990000,
//     role: "Doctor",
//     password: "pass456",
//     picture: {
//       url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR27sFJreSiqEOAMqqHo3lkHyi1SE4MzAKUKg&usqp=CAU",
//     },
//     address: "777, Cedar Court",
//     language: "English",
//     appointments: ["appointment_id_7"],
//     specialization: "Veterinary Dentistry",
//   },
// ];

// Function to fetch the dummy data
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
    doctorInfo.innerHTML = `
       
       <img  class="imageY" src="https://orlandodermatologycenter.com/wp-content/uploads/2015/12/doctor-2.jpg" alt="Dr Image"/>
          <h2 class="Drname">Name: Dr Salunke</h2>
       <p class="EmailY">Email:abc@gmail.com</p>
       <p class="AddressY">Address:xyz</p>
          <p class="Mobile">Mobile No: 8605268227</p>
          <p>Time: ${user.meeting_time}</p>
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

    // viewAppointmentBtn.addEventListener("click", () => {
    //   Redirect to the "book_appointment_form.html" page
    //   window.location.href = "appointment_form.html";
    //   localStorage.setItem("selectedDoctor", JSON.stringify(doctor));
    //   console.log(`Book an appointment with ${doctor.name}`);
    // });
  });
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
// let user_detail_name = document.getElementById("user-detail-name");

signUser.textContent = `${userDetails.name}`;
// user_detail_name.textContent = `${userDetails.name}`;

// let imageDiv = document.getElementById("imageDiv");

// imageDiv.innerHTML = null;
// let image = document.createElement("img");
// image.setAttribute("src", userDetails.picture);
// image.setAttribute("alt", userDetails.name);
// imageDiv.append(image);
// https://meeteasy-main-server.onrender.com/photos/files/648b04ab43adde36fe392b22

function logout() {
  localStorage.removeItem("userDetails");
  location.href = "index.html";
}
