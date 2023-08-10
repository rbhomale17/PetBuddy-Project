let userDetails = JSON.parse(localStorage.getItem('userDetails')) || {};
var baseUrl = `https://petbuddy-main-server.onrender.com`


document.getElementById('uploadButton').addEventListener('click', (e) => {
  e.preventDefault();
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
        fetchData()
      })
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
      let imageDiv = document.getElementById('imageDiv');

      imageDiv.innerHTML = null;
      let image = document.createElement('img');
      image.setAttribute('src', userDetails.picture);
      image.setAttribute('alt', userDetails.name);
      imageDiv.append(image);
      location.reload()
  //     // document.getElementById('fileInput') = null
    })
    .catch(error => {
      console.error('An error occurred during file upload:', error);
    });
});

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
  }
})


// https://meeteasy-main-server.onrender.com/photos/files/648b04ab43adde36fe392b22

let allUsers = document.getElementById("allUsers");
let admin = document.getElementById("admin");
let doctor = document.getElementById("doctor");
let customer = document.getElementById("customer");

// window.onscroll = function () { fetchDetails() }
fetchDetails()

function fetchDetails() {
  fetch(`${baseUrl}/users`)
    .then((res) => res.json()).then((res) => {
      // console.log(res.users)
      allUsers.innerText = res.users.length;
      admin.innerText = res.users.filter((element) => {
        return element.role == "Admin"
      }).length
      doctor.innerText = res.users.filter((element) => {
        return element.role == "Doctor"
      }).length
      customer.innerText = res.users.filter((element) => {
        return element.role == "Customer"
      }).length
    });
}


let deleteProduct = document.getElementById("deleteProduct");

let deleteID = document.getElementById("deleteID");

deleteProduct.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch(`${baseUrl}/users/delete/${deleteID.value}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      // "authorization": `Bearer ${saveToken.token}`
    }
  }).then((res) => res.json()).then((res) => {
    // console.log(res.msg)
    alert(res.msg)
    fetchData()
    fetchDetails()
  }).catch((err) => console.log(err.msg))
})



let container = document.getElementById("product-container");
let pagination = document.getElementById("pagination")


window.addEventListener("load", () => {
  fetchData()
})
let page = 1; ProductLimit = 4

function fetchData() {
  pagination.innerHTML = null
  fetch(`${baseUrl}/users`)
    .then((res) => res.json())
    .then((res) => {
      // console.log(res.users);
      let length = res.users.length;
      let total = Math.ceil(length / ProductLimit);
      // console.log(total)
      for (let i = 1; i <= total; i++) {
        pagination.append(createbtn(i, i))
      }
      let data = res.users.slice(0, ProductLimit);
      // console.log(data);
      getCardList(data)
    })
}

function createbtn(page, id) {
  let button = document.createElement("button");
  button.setAttribute("data-id", id);
  button.textContent = page;
  button.addEventListener("click", (e) => {
    page = e.target.dataset.id;
    fetchDataAfterPagination(page)
    // console.log(e.target.dataset.id,query)
  })
  return button
}
function fetchDataAfterPagination(page, query) {
  // console.log(page);
  fetch(`${baseUrl}/users/?page=${page}&limit=${ProductLimit}`).then((res) => res.json()).then((res) => {
    console.log(res.users);
    getCardList(res.users)
  })
}

// // getCardList(product)
function getCardList(data) {

  container.innerHTML = null;
  let cardList = document.createElement("div");
  cardList.classList = "card-list";
  container.append(cardList);
  // console.log(data);
  data.forEach((element) => {
    // console.log(element);
    let card = getCard(element._id, element.name, element.picture, element.email, element.mobile, element.role);
    cardList.append(card)
  });

  return cardList;
}
function getCard(dataId, name, avatar, email, mobile, role, rating, price, quantity) {
  // console.log({dataId:dataId, title:title, brand:brand, category:category, rating:rating, price:price, avatar:avatar, quantity:quantity});
  let card = document.createElement("div");
  card.classList = "card";
  card.setAttribute("data-id", dataId);
  // card.innerText=username;

  let imageCard = document.createElement("div");
  imageCard.classList = "card_img";

  let image = document.createElement("img");
  // console.log(avatar);
  image.src = avatar;
  image.setAttribute("alt", `${name} image`);

  let cardBody = document.createElement("div");
  cardBody.classList = "card_body";

  let nameCard = document.createElement("h4");
  nameCard.classList = "card_item";
  nameCard.classList = "card_title";
  nameCard.innerText = `Name: ${name}`;

  let userID = document.createElement("h4");
  userID.classList = "card_item"
  userID.classList = "card_description";
  userID.innerText = `user ID: ${dataId}`;

  let userEmail = document.createElement("h4");
  userEmail.classList = "card_item"
  userEmail.classList = "card_description";
  userEmail.innerHTML = `Email: ${email}`;

  let userMobile = document.createElement("h4");
  userMobile.classList = "card_item"
  userMobile.classList = "card_description";
  userMobile.innerHTML = `Mobile: ${mobile}`;

  let userRole = document.createElement("h4");
  userRole.classList = "card_item"
  userRole.classList = "card_description";
  userRole.innerHTML = `Role: ${role}`;

  cardBody.append(userID, nameCard, userEmail, userMobile, userRole)//ratingCard,  priceCard, quantityCard, 

  imageCard.append(image)

  card.append(imageCard, cardBody)

  return card;
};

function logout() {
  localStorage.removeItem('userDetails');
  location.href = '../index.html'
}

