let baseUrl = "http://localhost:3000";
let id = JSON.parse(localStorage.getItem("selectedDoctor"))._id
let userDetails = JSON.parse(localStorage.getItem("userDetails")) || {};
const user_id = userDetails._id;
let appointment_id = ""



async function fetchDummyData() {
    try {
      const response = await fetch(`${baseUrl}/doctor/appointments?id=${id}`);
    //   console.log(response)
      const data = await response.json();
      return data.data.appointments
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }
// Call the fetchDummyData function and display the data
fetchDummyData()
    .then((data) => {
    if (data) {
        displayData(data);
        // console.log(data)
    }
    })
    .catch((error) => {
    console.log('Error:', error);
    });



function displayData(data){
    const container = document.getElementById("bookedslots");
  
    container.innerHTML = ""; 
    data.forEach((el) => {
        console.log(el._id)
        if(!el.status){
            let formatedTime = formatMeetingTime(`${el.meeting_time}`)
            const doctorInfo = document.createElement("div");
            doctorInfo.innerHTML = `
                <button class="book-appointment-btn" data-id="${el._id}">${formatedTime}</button>
            `;
            doctorInfo.querySelector('.book-appointment-btn').addEventListener("click",async(event)=>{
                event.preventDefault()
                appointment_id=event.target.dataset.id
                // console.log(appointment_id)
            })
            container.appendChild(doctorInfo);
        }
    })
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
    const formData = {
        pet_type: petType,
        pet_gender: petGender,
        appointment_id:appointment_id,
        user_id:user_id
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
            
        } else {
            console.log("Request failed:", response.status, response.statusText);
            
        }
    } catch (error) {
        console.log("An error occurred:", error);
        
    }
}