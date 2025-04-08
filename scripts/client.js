let shoppingCart = []; // Array to store selected products

fetch("https://rational-mastiff-model.ngrok-free.app/products", {
  method: "GET",
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
})
  .then((response) => response.text())
  .then((data) => {
    products = JSON.parse(data);
    const shopPage = document.getElementById("shop-page");

    products.forEach((product) => {
      // Create the service container
      const serviceDiv = document.createElement("div");
      serviceDiv.classList.add("service");
      // Create photo image
      const img = document.createElement("img");
      img.src = `./assets/products/${product.PRODUCT}.png`
      // Create the product name
      const h2 = document.createElement("h2");
      h2.textContent = product.PRODUCT;

      // Create the description
      const p = document.createElement("p");
      p.textContent = product.ITEM_DESCRIPTION;

      // Create the price
      const priceDiv = document.createElement("div");
      priceDiv.classList.add("price");
      priceDiv.textContent = `${parseFloat(product.PRICE)} $/ft`;

      // Create action container (for input + button)
      const actionDiv = document.createElement("div");
      actionDiv.classList.add("action-container");

      // Create quantity selector
      const quantityInput = document.createElement("input");
      quantityInput.type = "number";
      quantityInput.value = 1;
      quantityInput.min = 1;
      quantityInput.classList.add("quantity-input");

      // Create the "Request Now" button
      const btn = document.createElement("a");
      btn.href = "#";
      btn.classList.add("btn");
      btn.textContent = "Request Now";
      btn.addEventListener("click", () =>
        addToCart(product, quantityInput.value)
      );

      // Append input and button to action container
      actionDiv.appendChild(quantityInput);
      actionDiv.appendChild(btn);

      // Append elements to the service container
      serviceDiv.appendChild(img)
      serviceDiv.appendChild(h2);
      serviceDiv.appendChild(p);
      serviceDiv.appendChild(priceDiv);
      serviceDiv.appendChild(actionDiv); // Append new action container

      // Append to shop page
      shopPage.appendChild(serviceDiv);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Function to add items to cart
function addToCart(product, quantity) {
  const existingItem = shoppingCart.find(
    (item) => item.PRODUCT === product.PRODUCT
  );

  if (existingItem) {
    existingItem.quantity += parseInt(quantity);
  } else {
    shoppingCart.push({ ...product, quantity: parseInt(quantity) });
  }

  updateCart();
}

// Function to update cart display
function updateCart() {
  const cartDiv = document.getElementById("cart");
  cartDiv.innerHTML = "<h2>Shopping Cart</h2>";

  shoppingCart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");
    itemDiv.textContent = `${item.PRODUCT} - ${(
      parseFloat(item.PRICE) * item.quantity
    ).toFixed(2)} $/ft (x${item.quantity})`;

    // Remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.onclick = () => {
      shoppingCart.splice(index, 1);
      updateCart();
    };

    itemDiv.appendChild(removeBtn);
    cartDiv.appendChild(itemDiv);
  });

  // Add submit button if cart is not empty
  if (shoppingCart.length > 0) {
    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit Order";
    submitBtn.onclick = submitOrder;
    cartDiv.appendChild(submitBtn);
  }
}

// Function to submit order
function submitOrder() {
  if (localStorage.getItem("UserID") === null) {
    alert("Must be login to place an order");
    return;
  }
  fetch("https://rational-mastiff-model.ngrok-free.app/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      order: shoppingCart,
      userId: localStorage.getItem("UserID"),
      email: localStorage.getItem("Useremail"),
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Order submitted successfully!");
      shoppingCart = [];
      updateCart();
    })
    .catch((error) => {
      alert("Somthing went wrong create a contact form");
      console.error("Error:", error);
    });
}
const addInvoiceLink = () => {
  if (document.getElementById("invoice-link")) return;

  const link = createElement("a", "", "Invoices");
  link.id = "invoice-link";
  link.href = "#invoice";

  link.addEventListener("click", (e) => {
    e.preventDefault();
    ["main-page", "shop-page", "cart"].forEach((id) => {
      document.getElementById(id).style.display = "none";
    });
    document.getElementById("invoice-page").style.display = "block";
    location.hash = "contact";
  });

  document.getElementById("shop-link").insertAdjacentElement("afterend", link);
};
const createElement = (tag, className = "", text = "") => {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
};

const loginHandler = (endpoint, id) =>
  fetch(`https://rational-mastiff-model.ngrok-free.app/${endpoint}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify({ adminId: id }),
  })
    .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
    .then(({ ok, data }) => {
      if (!ok) return console.warn(data.error);
      addInvoiceLink();
      return data;
    })
    .catch(console.error);

const adminLogin = (id) => loginHandler("admin", id);
const userLogin = (id) => loginHandler("user", id);

const fetchOrders = (role, id) =>
  fetch(`https://rational-mastiff-model.ngrok-free.app/${role}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify({ adminId: id }),
  })
    .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
    .then(({ ok, data }) => (ok ? data : console.warn(data.error)))
    .catch(console.error);

const userOrders = (id) => fetchOrders("user", id);
const adminOrders = (id) => fetchOrders("admin", id);
