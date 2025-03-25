fetch("https://rational-mastiff-model.ngrok-free.app/products", {
  method: "GET",
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
})
  .then((response) => response.text()) // Get the text from the response
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
      priceDiv.textContent = product.PRICE;

      // Create the "Request Now" button
      const btn = document.createElement("a");
      btn.href = "#";
      btn.classList.add("btn");
      btn.textContent = "Request Now";

      // Append all elements to the service container
      serviceDiv.appendChild(h2);
      serviceDiv.appendChild(p);
      serviceDiv.appendChild(priceDiv);
      serviceDiv.appendChild(btn);

      // Append the service container to the shop page
      shopPage.appendChild(serviceDiv);
      console.log(serviceDiv);
    });
  })
  .catch((error) => {
    // Handle any errors
    console.error("Error:", error);
  });

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
      return loginResult;
    } else {
      console.log(loginResult.error);
      return false
    }
  } catch (error) {
    console.error("Error:", error);
  }
  return false;
}
