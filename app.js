let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartButton = document.getElementById("cartButton");
let productsList = document.querySelector(".productsList");

cartButton.addEventListener("click", () => {
  window.location.href = "cart.html";
});

function navigateToCategory(categoryId) {
  sessionStorage.setItem("categoryId", categoryId);
  window.location.href = "index.html";
}

function alert(message) {
  let alertBox = document.getElementById("alert");
  alertBox.textContent = message;
  alertBox.classList.add("show");

  setTimeout(() => {
    alertBox.classList.remove("show");
  }, 2000);
}

function addToCart(item) {
  let existingItem = cart.find((cartItem) => cartItem.id === item.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    item.quantity = 1;
    cart.push(item);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${item.name} დაემატა კალათაში`);
}

function createProductCard(item) {
  return `
    <div class="product-card">
      <img src="${item.image}" alt="">
      <h3>${item.name}</h3>
      <p>Spiciness: ${item.spiciness}</p>
      <div class="nutsAndVegetarian">
        <p><i class="${
          item.nuts
            ? "fa-solid fa-circle veg-icon"
            : "fa-regular fa-circle non-veg-icon"
        }"></i>${item.nuts ? "Nuts" : "Nuts"}</p>
        <p><i class="${
          item.vegeterian
            ? "fa-solid fa-circle veg-icon"
            : "fa-regular fa-circle non-veg-icon"
        }"></i>${item.vegeterian ? "Vegetarian" : "Vegetarian"}</p>
      </div>
      <div class="priceBox">
        <p class="price">$ ${item.price}</p>
        <button class="add-to-cart-btn" data-product='${JSON.stringify(
          item
        )}'>Add to cart</button>
      </div>
    </div>
  `;
}

productsList.addEventListener("click", (event) => {
  if (event.target && event.target.classList.contains("add-to-cart-btn")) {
    let item = JSON.parse(event.target.getAttribute("data-product"));
    addToCart(item);
  }
});

let categoryId = sessionStorage.getItem("categoryId");

if (!categoryId || categoryId == 0) {
  fetch("https://restaurant.stepprojects.ge/api/Products/GetAll")
    .then((response) => response.json())
    .then((data) => {
      productsList.innerHTML = "";
      data.forEach((item) => {
        productsList.innerHTML += createProductCard(item);
      });
    });
} else {
  fetch(
    `https://restaurant.stepprojects.ge/api/Categories/GetCategory/${categoryId}`
  )
    .then((response) => response.json())
    .then((data) => {
      productsList.innerHTML = "";
      data.products.forEach((item) => {
        productsList.innerHTML += createProductCard(item);
      });
    });
}

window.addEventListener("scroll", function () {
  let nav = document.querySelector("nav");
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

let spicinessRange = document.querySelector(".range");
let spicinessValue = document.getElementById("spicinessValue");
let applyFilterButton = document.querySelector(".apply");
let resetFilterButton = document.querySelector(".reset");
let checkboxes = document.querySelectorAll("input[type='checkbox']");
let products = [];
let selectedFilters = { spiciness: -1, noNuts: false, vegetarian: false };

spicinessRange.addEventListener("input", function () {
  let value = parseInt(spicinessRange.value);
  spicinessValue.textContent =
    value === -1 ? "Spiciness: Not Chosen" : `Spiciness: ${value}`;
});

applyFilterButton.addEventListener("click", function () {
  selectedFilters.spiciness = parseInt(spicinessRange.value);
  selectedFilters.noNuts = checkboxes[0].checked;
  selectedFilters.vegetarian = checkboxes[1].checked;

  filterProducts();
});

resetFilterButton.addEventListener("click", function () {
  spicinessRange.value = -1;
  spicinessValue.textContent = "Spiciness: Not Chosen";
  checkboxes.forEach((cb) => (cb.checked = false));

  selectedFilters = { spiciness: -1, noNuts: false, vegetarian: false };
  filterProducts();
});

function filterProducts() {
  let filteredProducts = products.filter((item) => {
    let matchesSpiciness =
      selectedFilters.spiciness === -1 ||
      item.spiciness == selectedFilters.spiciness;
    let matchesNuts = !selectedFilters.noNuts || !item.nuts;
    let matchesVegetarian = !selectedFilters.vegetarian || item.vegeterian;

    return matchesSpiciness && matchesNuts && matchesVegetarian;
  });

  productsList.innerHTML = "";
  if (filteredProducts.length === 0) {
    productsList.innerHTML = "<p>No products match the selected filters.</p>";
  } else {
    filteredProducts.forEach((item) => {
      productsList.innerHTML += createProductCard(item);
    });
  }
}

function fetchProducts() {
  let categoryId = sessionStorage.getItem("categoryId");
  let apiUrl =
    categoryId && categoryId != 0
      ? `https://restaurant.stepprojects.ge/api/Categories/GetCategory/${categoryId}`
      : "https://restaurant.stepprojects.ge/api/Products/GetAll";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      products = categoryId && categoryId != 0 ? data.products : data;
      filterProducts();
    });
}

fetchProducts();

let navImage = document.querySelector(".navImage");
navImage.addEventListener("click", () => {
  fetch("https://restaurant.stepprojects.ge/api/Products/GetAll")
    .then((response) => response.json())
    .then((data) => {
      productsList.innerHTML = "";
      data.forEach((item) => {
        productsList.innerHTML += createProductCard(item);
      });
    });
});

let homeButton = document.querySelector(".button1");
homeButton.addEventListener("click", () => {
  fetch("https://restaurant.stepprojects.ge/api/Products/GetAll")
    .then((response) => response.json())
    .then((data) => {
      productsList.innerHTML = "";
      data.forEach((item) => {
        productsList.innerHTML += createProductCard(item);
      });
    });
});

function openMenu() {
  window.location.href = "toggler.html";
}
