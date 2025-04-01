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
    itemDiv.textContent = `${item.PRODUCT} - ${
      (parseFloat(item.PRICE) * item.quantity).toFixed(2)
    } $/ft (x${item.quantity})`;

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
      email: localStorage.getItem("Useremail")
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

async function adminLogin(adminId) {
  try {
    const loginResponse = await fetch(
      "https://rational-mastiff-model.ngrok-free.app/admin/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({ adminId }),
      }
    );

    const loginResult = await loginResponse.json();

    if (loginResponse.ok) {
      console.log("login success");
      console.log(loginResult);
      const shopLink = document.getElementById("shop-link");

      // Create the new Invoices link
      const invoiceLink = document.createElement("a");
      invoiceLink.id = "invoice-link";
      invoiceLink.href = "#invoice";
      invoiceLink.innerText = "Invoices";

      // Insert the Invoices link right after the Shop link
      shopLink.insertAdjacentElement("afterend", invoiceLink);

      document
        .getElementById("invoice-link")
        .addEventListener("click", function (event) {
          event.preventDefault();
          document.getElementById("main-page").style.display = "none";
          document.getElementById("shop-page").style.display = "none";
          document.getElementById("cart").style.display = "none";
          document.getElementById("invoice-page").style.display = "block";
          location.hash = "contact"; // This will make the page scroll to the Contact section
        });
      return loginResult;
    } else {
      console.log(loginResult.error);
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
  }
  return false;
}

async function userLogin(userId) {
  try {
    const loginResponse = await fetch(
      "https://rational-mastiff-model.ngrok-free.app/user/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({ adminId: userId }),
      }
    );

    const loginResult = await loginResponse.json();

    if (loginResponse.ok) {
      console.log("login success");
      console.log(loginResult);
      const shopLink = document.getElementById("shop-link");

      // Create the new Invoices link
      const invoiceLink = document.createElement("a");
      invoiceLink.id = "invoice-link";
      invoiceLink.href = "#invoice";
      invoiceLink.innerText = "Invoices";

      // Insert the Invoices link right after the Shop link
      shopLink.insertAdjacentElement("afterend", invoiceLink);

      document
        .getElementById("invoice-link")
        .addEventListener("click", function (event) {
          event.preventDefault();
          document.getElementById("main-page").style.display = "none";
          document.getElementById("shop-page").style.display = "none";
          document.getElementById("cart").style.display = "none";
          document.getElementById("invoice-page").style.display = "block";
          location.hash = "contact"; // This will make the page scroll to the Contact section
        });
      return loginResult;
    } else {
      console.log(loginResult.error);
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
  }
  return false;
}


async function userOrders(userId) {
  try {
    const loginResponse = await fetch(
      "https://rational-mastiff-model.ngrok-free.app/user/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({ adminId: userId }),
      }
    );

    const loginResult = await loginResponse.json();

    if (loginResponse.ok) {
      console.log("login success");
      return loginResult;
    } else {
      console.log(loginResult.error);
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
  }
  return false;
}

async function adminOrders(userId) {
  try {
    const loginResponse = await fetch(
      "https://rational-mastiff-model.ngrok-free.app/admin/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({ adminId: userId }),
      }
    );

    const loginResult = await loginResponse.json();

    if (loginResponse.ok) {
      console.log("login success");
      return loginResult;
    } else {
      console.log(loginResult.error);
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
  }
  return false;
}
