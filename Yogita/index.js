let userDetails = JSON.parse(localStorage.getItem("userDetails")) || {};

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

////////////// caching user data from params
const urlParams = new URLSearchParams(window.location.search);
const userData = JSON.parse(decodeURIComponent(urlParams.get("userdata")));
///////////// Use the user data in your HTML page
// /////////////////console.log(userData); // Output the user data to the console or perform any other operations
// window.addEventListener("load", () => {
//   if (userData) {
//     localStorage.setItem("userDetails", JSON.stringify(userData));
//   }
// });
// if (userData) {
//   localStorage.setItem("userDetails", JSON.stringify(userData));
// }

// let signUser = document.getElementById("username");
// let user_detail_name = document.getElementById("user-detail-name");

// signUser.textContent = `${userDetails.name}`;
// user_detail_name.textContent = `${userDetails.name}`;

// let imageDiv = document.getElementById("imageDiv");

// imageDiv.innerHTML = null;
// let image = document.createElement("img");
// image.setAttribute("src", userDetails.picture);
// image.setAttribute("alt", userDetails.name);
// imageDiv.append(image);
///////////////////// https://meeteasy-main-server.onrender.com/photos/files/648b04ab43adde36fe392b22

let amount = localStorage.getItem("amount") || {};
function logout() {
  localStorage.removeItem("userDetails");
  localStorage.removeItem("amount");
  location.href = "index.html";
}
// crouserCSs////////////////////////////////////////////////////////
let counter = 1;
setInterval(function () {
  document.getElementById("radio" + counter).checked = true;
  counter++;
  if (counter > 5) {
    counter = 1;
  }
}, 4000);
