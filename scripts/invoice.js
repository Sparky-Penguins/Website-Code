document
  .getElementById("contactForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent the default form submission
    if (localStorage.getItem("UserID") === null) {
      document.getElementById("response").innerText = "Not logged in";
      return;
    }
    // Capture form data
    const formData = {
      Name: document.getElementById("name").value,
      Email: document.getElementById("email").value,
      Subject: document.getElementById("subject").value,
      Message: document.getElementById("message").value,
      UserId: localStorage.getItem("UserID"),
    };

    try {
      // Send data to the server
      const response = await fetch(
        "https://rational-mastiff-model.ngrok-free.app/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      // Display server response
      document.getElementById("response").innerText = result.message;

      // Reset the form after submission
      this.reset();
    } catch (error) {
      console.error("Error:", error);
      document.getElementById("response").innerText = "Error sending data.";
    }
  });

// Show the selected tab content
function showTab(tabName) {
  document.getElementById("customerContent").style.display =
    tabName === "customer" ? "block" : "none";
  document.getElementById("jobContent").style.display =
    tabName === "job" ? "block" : "none";

  // Toggle active class for tabs
  document.getElementById("customerTab").classList.remove("active");
  document.getElementById("jobTab").classList.remove("active");

  if (tabName === "customer") {
    document.getElementById("customerTab").classList.add("active");
  } else {
    document.getElementById("jobTab").classList.add("active");
  }
}

// Load customer questions into the table
function loadCustomerInvoices(customerInvoices) {
  const customerBody = document.getElementById("customerBody");
  customerBody.innerHTML = "";

  if (customerInvoices.length === 0) {
    document.getElementById("noCustomerData").style.display = "block";
    return;
  }
  console.log(customerInvoices);
  customerInvoices.forEach((invoice) => {
    const row = `
                    <tr>
                        <td>${invoice.Name}</td>
                        <td>${invoice.Email}</td>
                        <td>${invoice.Subject}</td>
                        <td>${invoice.Message}</td>
                        <td>${invoice.timestamp}</td>
                    </tr>
                `;
    customerBody.innerHTML += row;
  });
}

function loadCustomerOrders(customerOrders) {
  const customerBody = document.getElementById("jobBody");
  customerBody.innerHTML = "";

  if (customerOrders.length === 0) {
    document.getElementById("noOrderData").style.display = "block";
    return;
  }

  customerOrders.forEach((order) => {
    // Loop through each order and create rows for each product in the order
    order.order.forEach((product) => {
      const row = `
                    <tr>
                        <td>${order.email || "No Email Provided"}</td>
                        <td>${product.PRODUCT}</td>
                        <td>${product.PRICE}</td>
                        <td>${product.quantity}</td>
                        <td>${order.timestamp}</td>
                    </tr>
                `;
      customerBody.innerHTML += row;
    });
  });
}

// Load job invoices into the table
function loadJobInvoices() {
  const jobBody = document.getElementById("jobBody");
  jobBody.innerHTML = "";

  if (jobInvoices.length === 0) {
    document.getElementById("noJobData").style.display = "block";
    return;
  }

  jobInvoices.forEach((invoice) => {
    const row = `
                    <tr>
                        <td>${invoice.title}</td>
                        <td>${invoice.description}</td>
                        <td>$${invoice.cost}</td>
                        <td>${invoice.date}</td>
                    </tr>
                `;
    jobBody.innerHTML += row;
  });
}

// Initial load of invoices
// document.addEventListener("DOMContentLoaded", function () {
// //   loadCustomerInvoices();
// //   loadJobInvoices();
// });
