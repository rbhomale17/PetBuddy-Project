let userDetails = JSON.parse(localStorage.getItem("userDetails")) || {};
let baseUrl = "https://petbuddy-main-server.onrender.com";
let specialization = document.getElementById("specialization");
let language = document.getElementById("language");
let searchBtn = document.getElementById("searchBtn");


searchBtn.addEventListener('click', async () => {
  const search_value = document.getElementById('searchId').value;
  console.log('Search data:', search_value);
  fetchDatawithQuery(search_value)
});

specialization.addEventListener("change", async (e) => {
  let search_value = e.target.value
  fetchDatawithQuery(search_value)
})

language.addEventListener("change", async (e) => {
  let search_value = e.target.value
  console.log(search_value)
  fetchDatawithQuery(search_value)
})

async function fetchDatawithQuery(search_value) {
  try {
    const response = await fetch(
      `${baseUrl}/doctor/findDoctor?search=${search_value}`
    );
    const data = await response.json();
    // console.log(data.data)
    displayData(data.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
// Function to fetch the dummy data
async function fetchDummyData() {
  try {
    const response = await fetch(`${baseUrl}/doctor`); // Replace with the actual API endpoint where your dummy data is hosted
    console.log(response)
    const data = await response.json();
    console.log(data.data)
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

// Function to display the data
function displayData(data) {
  console.log(data);
  const container = document.getElementById("data-container");
  if (!container) {
    console.error("Error: data-container element not found.");
    return;
  }

  container.innerHTML = ""; // Clear the container before adding new data

  data.forEach((doctor) => {
    const doctorInfo = document.createElement("div");
    doctorInfo.className = 'doctorDiv'
    doctorInfo.innerHTML = `
        <img src=${doctor.picture}/>
        <h2>${doctor.name}</h2>
        <p>Email: ${doctor.email}</p>
        <p>Mobile: ${doctor.mobile}</p>
        <p>Role: ${doctor.role}</p>
        <p>Address: ${doctor.address}</p>
        <p>Language: ${doctor.language}</p>
        <p>Specialization: ${doctor.specialization}</p>
        <button class="book-appointment-btn">Book an Appointment</button>
    `;
    container.appendChild(doctorInfo);

    const bookAppointmentBtn = doctorInfo.querySelector(
      ".book-appointment-btn"
    );
    bookAppointmentBtn.addEventListener("click", () => {
      // Redirect to the "book_appointment_form.html" page
      window.location.href = "appointment_form.html";
      localStorage.setItem("selectedDoctor", JSON.stringify(doctor));
      console.log(`Book an appointment with ${doctor.name}`);
    });
  });
}

// Call the fetchDummyData function and display the data
fetchDummyData()
  .then((data) => {
    if (data) {
      displayData(data);
    }
  })
  .catch((error) => {
    console.log('Error:', error);
  });

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
