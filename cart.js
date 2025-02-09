let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartProductsList = document.querySelector(".cartProductsList");
let clearCartButton = document.getElementById("clearCartButton");
let totalAmount = document.querySelector(".totalAmount");

clearCartButton.addEventListener("click", () => {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
});

function renderCart() {
  cartProductsList.innerHTML = "";
  let totalSum = 0;

  if (cart.length === 0) {
    cartProductsList.innerHTML = "<p>თქვენი კალათა ცარიელია</p>";
  } else {
    cart.forEach((item, index) => {
      let total = item.price * item.quantity;
      totalSum += total;

      let cartItem = document.createElement("div");
      cartItem.classList.add("cartItem");
      cartItem.innerHTML = `
        <div class="secondLine">
          <div class="cartObject">
            <div class="removeButton">
              <button onclick="removeFromCart(${index})"><i class="fa-solid fa-xmark"></i></button><button><i class="fa-solid fa-pencil"></i></button>
            </div>
            <img src="${item.image}" alt="">
            <h3>${item.name}</h3>
          </div>
          <div class="priceBox">
            <div class="quantity-control">
              <button class="increase" data-index="${index}"><i class="fa-solid fa-circle-plus"></i></button>
              <input type="number" class="quantity" value="${item.quantity}" min="1" data-index="${index}" />
              <button class="decrease" data-index="${index}"><i class="fa-solid fa-circle-minus"></i></button>
            </div>
            <p class="price">$ ${item.price}</p>
            <p class="total" data-index="${index}">$ ${total}</p>
          </div>
        </div>
      `;
      cartProductsList.appendChild(cartItem);
    });
  }

  totalAmount.innerText = `$${totalSum.toFixed(1)}`;
  attachQuantityListeners();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function attachQuantityListeners() {
  document.querySelectorAll(".decrease").forEach((button) => {
    button.addEventListener("click", function () {
      let index = this.getAttribute("data-index");
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
        updateQuantityDisplay(index);
      }
    });
  });

  document.querySelectorAll(".increase").forEach((button) => {
    button.addEventListener("click", function () {
      let index = this.getAttribute("data-index");
      cart[index].quantity++;
      updateQuantityDisplay(index);
    });
  });

  document.querySelectorAll(".quantity").forEach((input) => {
    input.addEventListener("change", function () {
      let index = this.getAttribute("data-index");
      let newValue = parseInt(this.value);
      if (newValue >= 1) {
        cart[index].quantity = newValue;
        updateQuantityDisplay(index);
      } else {
        this.value = 1;
        cart[index].quantity = 1;
      }
    });
  });
}

function updateQuantityDisplay(index) {
  let item = cart[index];
  let total = item.price * item.quantity;

  document.querySelector(`.quantity[data-index="${index}"]`).value =
    item.quantity;
  document.querySelector(
    `.total[data-index="${index}"]`
  ).innerText = `$ ${total.toFixed(2)}`;

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

renderCart();

window.addEventListener("scroll", function () {
  let nav = document.querySelector("nav");
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

let navImage = document.querySelector(".navImage");
navImage.addEventListener("click", () => {
  window.location.href = "index.html";
});

let homeButton = document.querySelector(".button1");
homeButton.addEventListener("click", () => {
  window.location.href = "index.html";
});

let homeButton2 = document.getElementById("button1");
homeButton2.addEventListener("click", () => {
  window.location.href = "index.html";
});

function openMenu() {
  window.location.href = "toggler2.html";
}
