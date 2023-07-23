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

let amount = localStorage.getItem("amount") || {};
function logout() {
  localStorage.removeItem("userDetails");
  localStorage.removeItem("amount");
  location.href = "./index.html";
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
