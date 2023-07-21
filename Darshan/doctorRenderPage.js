
let data=[
    {
      "name": "John Doe",
      "email": "john@example.com",
      "mobile": 1234567890,
      "role": "Customer",
      "password": "password123",
      "picture": { "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR27sFJreSiqEOAMqqHo3lkHyi1SE4MzAKUKg&usqp=CAU" },
      "address": "123, Elm Street",
      "language": "English",
      "appointments": ["appointment_id_1", "appointment_id_2"],
      "specialization": "Veterinary Nutrition"
    },
    {
      "name": "Jane Smith",
      "email": "jane@example.com",
      "mobile": 9876543210,
      "role": "Admin",
      "password": "pass1234",
      "picture": { "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR27sFJreSiqEOAMqqHo3lkHyi1SE4MzAKUKg&usqp=CAU" },
      "address": "456, Oak Avenue",
      "language": "Spanish",
      "appointments": ["appointment_id_3"],
      "specialization": null
    },
    {
      "name": "Dr. Alex Johnson",
      "email": "alex@example.com",
      "mobile": 7418529630,
      "role": "Doctor",
      "password": "doctorPass",
      "picture": { "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR27sFJreSiqEOAMqqHo3lkHyi1SE4MzAKUKg&usqp=CAU" },
      "address": "789, Maple Road",
      "language": "English",
      "appointments": ["appointment_id_4", "appointment_id_5"],
      "specialization": "Veterinary Pathology"
    },
    {
      "name": "Mary Brown",
      "email": "mary@example.com",
      "mobile": 1112223333,
      "role": "Customer",
      "password": "mypass987",
      "picture": { "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR27sFJreSiqEOAMqqHo3lkHyi1SE4MzAKUKg&usqp=CAU" },
      "address": "999, Pine Lane",
      "language": "French",
      "appointments": ["appointment_id_6"],
      "specialization": null
    },
    {
      "name": "Dr. Sarah Lee",
      "email": "sarah@example.com",
      "mobile": 8889990000,
      "role": "Doctor",
      "password": "pass456",
      "picture": { "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR27sFJreSiqEOAMqqHo3lkHyi1SE4MzAKUKg&usqp=CAU" },
      "address": "777, Cedar Court",
      "language": "English",
      "appointments": ["appointment_id_7"],
      "specialization": "Veterinary Dentistry"
    }
  ]
//   displayData(data)
let baseUrl = "";
let specialization = document.getElementById("specialization")
let language = document.getElementById("language")
let searchBtn = document.getElementById("searchBtn")

searchBtn.addEventListener('click', async() => {
    const search_value = document.getElementById('searchId').value;
    console.log('Search data:', search_value);
    fetchDatawithQuery(search_value)
});

specialization.addEventListener("change", async(e) => {
    let search_value = e.target.value
    fetchDatawithQuery(search_value)
})

language.addEventListener("change", async(e) => {
    let search_value = e.target.value
    console.log(search_value)
    fetchDatawithQuery(search_value)
})

async function fetchDatawithQuery(search_value){
    try {
        const response = await fetch(`${baseUrl}/doctor/findDoctor?${search_value}`);
        const data = await response.json();
        displayData(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
// Function to fetch the dummy data
async function fetchDummyData() {
    try {
    const response = await fetch(`${baseUrl}`); // Replace with the actual API endpoint where your dummy data is hosted
    const data = await response.json();
    
    return data;
    } catch (error) {
    console.error('Error fetching data:', error);
    return null;
    }
}

// Function to display the data
function displayData(data) {
    console.log(data)
    const container = document.getElementById('data-container');
    if (!container) {
    console.error('Error: data-container element not found.');
    return;
    }

    container.innerHTML = ""; // Clear the container before adding new data

    data.forEach((doctor) => {
    const doctorInfo = document.createElement('div');
    doctorInfo.innerHTML = `
        <img src=${doctor.picture.url}/>
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

    const bookAppointmentBtn = doctorInfo.querySelector(".book-appointment-btn");
    bookAppointmentBtn.addEventListener("click", () => {
        // Redirect to the "book_appointment_form.html" page
        window.location.href = "appointment_form.html";
        localStorage.setItem("selectedDoctor",JSON.stringify(doctor))
        console.log(`Book an appointment with ${doctor.name}`);
    });
    });
}

// Call the fetchDummyData function and display the data
fetchDummyData()
    .then((data) => {
    if (data) {
        console.log("1")
        displayData(data);
    }
    })
    .catch((error) => {
    console.log('Error:', error);
    });
