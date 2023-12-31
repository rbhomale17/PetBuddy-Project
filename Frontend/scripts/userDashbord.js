let userDetails = JSON.parse(localStorage.getItem('userDetails')) || {};
const baseUrl = "https://petbuddy-main-server.onrender.com"
// document.getElementById('uploadButton').addEventListener('click', (e) => {
//   e.preventDefault();

//   const fileInput = document.getElementById('fileInput');
//   const file = fileInput.files[0];
//   // console.log(file)
//   if (!file) {
//     return;
//   }
//   const formData = new FormData();
//   formData.append('file', file);
//   // console.log(formData);

//   fetch('https://petbuddy-main-server.onrender.com/photos/upload', {
//     method: 'POST',
//     body: formData
//   })
//     .then(response => response.json())
//     .then(data => {
//       console.log('File uploaded successfully. Accessible link:', data.link);
//       console.log(userDetails);
//       console.log(userDetails.picture);
//       userDetails.picture = data.link;
//       let obj = {
//         userID: userDetails._id,
//         picture: data.link
//       }
//       fetch(`${baseUrl}/users/update`, {
//         method: "PATCH",
//         headers: {
//           "content-type": "application/json"
//         },
//         body: JSON.stringify(obj)
//       }).then((res) => res.json()).then((res) => {
//         alert(res.msg)
//         // fetchData()
//       })
//       localStorage.setItem('userDetails', JSON.stringify(userDetails));
//       let imageDiv = document.getElementById('imageDiv');

//       imageDiv.innerHTML = null;
//       let image = document.createElement('img');
//       image.setAttribute('src', userDetails.picture);
//       image.setAttribute('alt', userDetails.name);
//       imageDiv.append(image);
//       document.getElementById('fileInput') = null
//     })
//     .catch(error => {
//       console.error('An error occurred during file upload:', error);
//     });
// });



document.getElementById('uploadButton').addEventListener('click', (e) => {
  e.preventDefault();
  let image1 = document.querySelector("#imageDiv>img").src.split("/")
  // console.log(image1[2].includes('meeteasy'));
  // retrun
if(image1[2].includes('meeteasy')){
  
  // let uploadID = image1[image1.length - 1];
  // console.log(uploadID);
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  // console.log(file)
  if (!file) {
    return; 
  }
  const formData = new FormData();
  formData.append('file', file);
  // console.log(formData);
  // console.log(`${baseUrl}/photos/upload`);
  fetch(`${baseUrl}/photos/upload`, {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      console.log('File uploaded successfully. Accessible link:', data.link);
      console.log(userDetails);
      console.log(userDetails.picture);
      userDetails.picture = data.link;
      let obj = {
        userID: userDetails._id,
        picture: data.link
      }
      console.log(obj);
      fetch(`${baseUrl}/users/update`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(obj)
      }).then((res) => res.json()).then((res) => {
        alert(res.msg)
        //     // fetchData()
      })
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
      let imageDiv = document.getElementById('imageDiv');

      imageDiv.innerHTML = null;
      let image = document.createElement('img');
      image.setAttribute('src', userDetails.picture);
      image.setAttribute('alt', userDetails.name);
      console.log(image);
      imageDiv.append(image);
      console.log(imageDiv);
      location.reload()
      //   // document.getElementById('fileInput') = null
    })

    .catch(error => {
      console.error('An error occurred during file upload:', error);
    });
}else{
  let image1 = document.querySelector("#imageDiv>img").src.split("/")
  let uploadID = image1[image1.length - 1];
  console.log(uploadID);
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  // console.log(file)
  if (!file) {
    return; 
  }
  const formData = new FormData();
  formData.append('file', file);
  // console.log(formData);
  console.log(`${baseUrl}/photos/upload?uploadID=${uploadID}`);
  fetch(`${baseUrl}/photos/upload?uploadID=${uploadID}`, {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      console.log('File uploaded successfully. Accessible link:', data.link);
      console.log(userDetails);
      console.log(userDetails.picture);
      userDetails.picture = data.link;
      let obj = {
        userID: userDetails._id,
        picture: data.link
      }
      console.log(obj);
      fetch(`${baseUrl}/users/update`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(obj)
      }).then((res) => res.json()).then((res) => {
        alert(res.msg)
        //     // fetchData()
      })
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
      let imageDiv = document.getElementById('imageDiv');

      imageDiv.innerHTML = null;
      let image = document.createElement('img');
      image.setAttribute('src', userDetails.picture);
      image.setAttribute('alt', userDetails.name);
      console.log(image);
      imageDiv.append(image);
      console.log(imageDiv);
      location.reload()
      //   // document.getElementById('fileInput') = null
    })

    .catch(error => {
      console.error('An error occurred during file upload:', error);
    });
}
})

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
let signUser = document.getElementById('username');
let user_detail_name = document.getElementById('user-detail-name');

signUser.textContent = `${userDetails.name}`
user_detail_name.textContent = `${userDetails.name}`;

let imageDiv = document.getElementById('imageDiv');

imageDiv.innerHTML = null;
let image = document.createElement('img');
image.setAttribute('src', userDetails.picture);
image.setAttribute('alt', userDetails.name);
imageDiv.append(image);
if (userDetails.role == "Doctor") {
  // Get the elements with the class name "features-content"
  const featuresContentElements = document.getElementsByClassName("features-content");

  // Assuming you want to add the new child to the first element with class "features-content"
  const firstFeaturesContentElement = featuresContentElements[0];

  // Create the new child element
  const newChildElement = document.createElement("a");
  newChildElement.href = "./addingSlotDoctor.html";

  newChildElement.innerHTML = `
  <div class="skills-card">
    <img class="features-card-img" src="./images/createAppointmentimg.jpg" alt="html" />
    <h4 class="features-card-name">Create Appointments</h4>
  </div>
`;

  // Append the new child element to the firstFeaturesContentElement
  firstFeaturesContentElement.appendChild(newChildElement);
}
// // caching user data from params
// const urlParams = new URLSearchParams(window.location.search);
// const userData = JSON.parse(decodeURIComponent(urlParams.get('userdata')));
// Use the user data in your HTML page
// console.log(userData); // Output the user data to the console or perform any other operations
window.addEventListener('load', () => {
  // caching user data from params
  const urlParams = new URLSearchParams(window.location.search);
  const userData = JSON.parse(decodeURIComponent(urlParams.get('userdata')));
  if (userData) {
    localStorage.setItem('userDetails', JSON.stringify(userData))
    let signUser = document.getElementById('username');
    let user_detail_name = document.getElementById('user-detail-name');

    signUser.textContent = `${userData.name}`
    user_detail_name.textContent = `${userData.name}`;

    let imageDiv = document.getElementById('imageDiv');

    imageDiv.innerHTML = null;
    let image = document.createElement('img');
    image.setAttribute('src', userData.picture);
    image.setAttribute('alt', userData.name);
    imageDiv.append(image);
    if (userData.role == "Doctor") {
      // Get the elements with the class name "features-content"
      const featuresContentElements = document.getElementsByClassName("features-content");

      // Assuming you want to add the new child to the first element with class "features-content"
      const firstFeaturesContentElement = featuresContentElements[0];

      // Create the new child element
      const newChildElement = document.createElement("a");
      newChildElement.href = "./addingSlotDoctor.html";

      newChildElement.innerHTML = `
  <div class="skills-card">
    <img class="features-card-img" src="./images/createAppointmentimg.jpg" alt="html" />
    <h4 class="features-card-name">Create Appointments</h4>
  </div>
`;

      // Append the new child element to the firstFeaturesContentElement
      firstFeaturesContentElement.appendChild(newChildElement);
    }
  }
})
function logout() {

  localStorage.removeItem('userDetails');
  location.href = './index.html'

}