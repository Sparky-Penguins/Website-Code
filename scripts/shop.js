document.getElementById("shop-link").addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("main-page").style.display = "none";
    document.getElementById("shop-page").style.display = "flex";
    location.hash = "shop";
});

document.getElementById("about-link").addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("main-page").style.display = "block";
    document.getElementById("shop-page").style.display = "none";
    location.hash = "about"; // This will make the page scroll to the About section
});

document.getElementById("services-link").addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("main-page").style.display = "block";
    document.getElementById("shop-page").style.display = "none";
    location.hash = "services"; // This will make the page scroll to the Services section
});

document.getElementById("contact-link").addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("main-page").style.display = "block";
    document.getElementById("shop-page").style.display = "none";
    location.hash = "contact"; // This will make the page scroll to the Contact section
});

// Select all elements with the class "btn"
const buttons = document.querySelectorAll('.btn');

// Loop through each element and bind the click event
buttons.forEach(button => {
  button.addEventListener('click', function() {
    if (localStorage.getItem("UserID")==null) {
        google.accounts.id.prompt();
    }
  });
});