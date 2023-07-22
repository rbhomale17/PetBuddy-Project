
// session storage for token
var saveToken = JSON.parse(sessionStorage.getItem("token"));
var saveToken = JSON.parse(sessionStorage.getItem("token")) || {};

let products = document.getElementById("products");
let admin = document.getElementById("admin");
let customer = document.getElementById("customer");
let income = document.getElementById("income");
let search = document.getElementById("search");

search.addEventListener("search",()=>{
    console.log(search.value);
})
var saveToken = JSON.parse(sessionStorage.getItem("token"));

if (!saveToken) {
    // alert("Please Log in First")
    // container.innerHTML = null;
    // container.innerHTML = `<h3> Please Log in First</h3>`
}
window.onscroll = function () { fetchDetails() }
fetchDetails()

function fetchDetails() {
    fetch(`https://moral-riddle-2098-project-server.onrender.com/products/`, {
        method: "GET",
        headers: {
            "authorization": `Bearer ${saveToken.token}`
        }
    }).then((res) => res.json()).then((res) => {
        products.innerText = res.products.length;
    });

    fetch(`https://moral-riddle-2098-project-server.onrender.com/users/`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${saveToken.token}`
        }
    }).then((res) => res.json()).then((res) => {
        let adminUser = 0;
        let customerUser = 0;
        // console.log(res.users);
        for (let i = 0; i < res.users.length; i++) {
            // console.log(res.users[i]);
            if (res.users[i].role == "Admin") {
                adminUser++;
            } else {
                customerUser++;
            }
            admin.innerText = adminUser;
            customer.innerText = customerUser;
        }
        // console.log(adminUser,customerUser)
    });

    fetch(`https://moral-riddle-2098-project-server.onrender.com/myorder/allorders`, {
        method: "GET",
        headers: {
            "authorization": `Bearer ${saveToken.token}`
        }
    }).then((res) => res.json()).then((res) => {
        // console.log(res)
        let ordersCost = 0;
        for (let i = 0; i < res.myorder.length; i++) {
            // console.log(res.myorder[i].cost);
            if (res.myorder[i].cost) {
                ordersCost += res.myorder[i].cost;
            }
        }
        // console.log(ordersCost);
        income.innerText = ordersCost;
    }).catch((err) => console.log(err));
}

let addnNew = document.getElementById("addNew");

let newtitle = document.getElementById("newtitle");
let newImage = document.getElementById("newImage");
let newBrand = document.getElementById("newBrand");
let newCategory = document.getElementById("newCategory");
let newRating = document.getElementById("newRating");
let newPrice = document.getElementById("newPrice");
let newQuntity = document.getElementById("newQuntity");

addnNew.addEventListener("submit",(e)=>{
    e.preventDefault();
    let newObject = {}
    if(newtitle.value) newObject.title = newtitle.value
    if(newBrand.value) newObject.brand = newBrand.value
    if(newCategory.value) newObject.category = newCategory.value
    if(newRating.value) newObject.rating = newRating.value
    if(newPrice.value) newObject.price = newPrice.value
    if(newImage.value) newObject.img = newImage.value
    if(newQuntity.value) newObject.quantity = newQuntity.value

    fetch(`https://moral-riddle-2098-project-server.onrender.com/products/add`,{
        method:"POST",
        headers:{
            "content-type":"application/json",
            "authorization":`Bearer ${saveToken.token}`
        },
        body:JSON.stringify(newObject)
    }).then((res)=>res.json()).then((res)=>{
        console.log(res.msg)
        alert(res.msg)
        fetchData()
    }).catch((err)=>console.log(err.msg))
})
// "title": { type: String, required: true},
//   "brand": { type: String, required: true},
//   "category": { type: String, required: true},
//   "rating": { type: Number, required: true, default: 2.8, min: 0.1, max: 5.1 },
//   "price": { type: Number, required: true, default: 389 },
//   "img": { type: String, default: "https://img10.hkrtcdn.com/13665/prd_1366409-MuscleBlaze-Ayurveda-for-Performance-Ashwagandha-500mg-60-tablets_o.jpg" },
//   "quantit

let updateProduct = document.getElementById("updateProduct");

let updateID = document.getElementById("updateID");
let updateTitle = document.getElementById("updateTitle");
let updateImage = document.getElementById("updateImage");
let updateRating = document.getElementById("updateRating");
let updatePrice = document.getElementById("updatePrice");
let updateQuantity = document.getElementById("updateQuantity");


updateProduct.addEventListener("submit",(e)=>{
    e.preventDefault();
    let newObject = {}
    if(updateTitle.value) newObject.title = updateTitle.value
    if(updateRating.value) newObject.rating = updateRating.value
    if(updatePrice.value) newObject.price = updatePrice.value
    if(updateImage.value) newObject.img = updateImage.value
    if(updateQuantity.value) newObject.quantity = updateQuantity.value
    
    fetch(`https://moral-riddle-2098-project-server.onrender.com/products/update/${updateID.value}`,{
        method:"PATCH",
        headers:{
            "content-type":"application/json",
            "authorization":`Bearer ${saveToken.token}`
        },
        body:JSON.stringify(newObject)
    }).then((res)=>res.json()).then((res)=>{
        console.log(res.msg)
        alert(res.msg)
        fetchData()
       
    }).catch((err)=>console.log(err.msg))
})


let deleteProduct = document.getElementById("deleteProduct");

let deleteID = document.getElementById("deleteID");

deleteProduct.addEventListener("submit",(e)=>{
    e.preventDefault();

    fetch(`https://moral-riddle-2098-project-server.onrender.com/products/delete/${deleteID.value}`,{
        method:"DELETE",
        headers:{
            "content-type":"application/json",
            "authorization":`Bearer ${saveToken.token}`
        }
    }).then((res)=>res.json()).then((res)=>{
        // console.log(res.msg)
        alert(res.msg)
        fetchData()
       
    }).catch((err)=>console.log(err.msg))
})



// window.onscroll = function () { fetchCartLength(), fetchWishlistLength() };

//  let container = document.getElementById("container");

let container = document.getElementById("product-container");
let pagination = document.getElementById("pagination")

// fetching Session Storage 


window.addEventListener("load", () => {
    fetchData()
})
let page = 1; ProductLimit = 14

function fetchData() {
    fetch(`https://moral-riddle-2098-project-server.onrender.com/products/`)
        .then((res) => res.json())
        .then((res) => {
            // console.log(res.products);
            let length = res.products.length;
            let total = Math.ceil(length / ProductLimit);
            // console.log(total)
            for (let i = 1; i <= total; i++) {
                pagination.append(createbtn(i, i))
            }
            let data = res.products.slice(length - ProductLimit);
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
    fetch(`https://moral-riddle-2098-project-server.onrender.com/products/?page=${page}&limit=${ProductLimit}`).then((res) => res.json()).then((res) => {
        // console.log(res.products);
        getCardList(res.products)
    })
}

// getCardList(product)
function getCardList(data) {
    let brand = {};
    let category = {};
    container.innerHTML = null;
    let cardList = document.createElement("div");
    cardList.classList = "card-list";
    container.append(cardList);
    // console.log(data);
    data.forEach((element) => {
        if (brand[element.brand] == undefined) {
            brand[element.brand] = 1;
        } else {
            brand[element.brand]++;
        }
        if (category[element.category] == undefined) {
            category[element.category] = 1;
        } else {
            category[element.category]++;
        }
        let card = getCard(element._id, element.title, element.brand, element.category, element.rating, element.price, element.img, element.quantity);
        cardList.append(card)
    });
    console.log("Brand", brand);
    console.log("category", category);
    return cardList;
}
function getCard(dataId, title, brand, category, rating, price, avatar, quantity) {
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
    image.setAttribute("alt", `${title} image`);

    let cardBody = document.createElement("div");
    cardBody.classList = "card_body";

    let nameCard = document.createElement("h4");
    nameCard.classList = "card_item";
    nameCard.classList = "card_title";
    nameCard.innerText = `${title}`;

    // let brandCard = document.createElement("h4");
    // brandCard.classList = "card_item"
    // brandCard.classList = "card_description";
    // brandCard.innerHTML = `Brand:${brand} Catgory: ${category}`;


    let ratingCard = document.createElement("h4");
    ratingCard.classList = "card_item"
    ratingCard.classList = "card_rating";
    ratingCard.innerHTML = `<i class="fa-sharp fa-solid fa-star" style="color: #212121;"></i> ${rating}`
    // `Rating: ${rating}  Price: ${price}`;

    let priceCard = document.createElement("h4");
    priceCard.classList = "card_item"
    priceCard.classList = "card_price";
    priceCard.innerText = `₹ ${price}`;

    let quantityCard = document.createElement("h4");
    quantityCard.classList = "card_item"
    quantityCard.classList = "card_quantity";
    quantityCard.innerText = `Quntity Remaining: ${quantity}`;

    let ProductID = document.createElement("h4");
    ProductID.classList = "card_item"
    ProductID.classList = "card_description";
    ProductID.innerText = `Product ID: ${dataId}`;

    cardBody.append(ratingCard, nameCard, priceCard, quantityCard, ProductID)

    imageCard.append(image)

    card.append(imageCard, cardBody)

    return card;
};