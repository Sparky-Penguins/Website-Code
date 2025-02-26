document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Create the JSON response object
    const response = "Your request has been received, please allow up to 24 hours for a team member to contact you.";

    // Convert the object to a formatted JSON string
    const jsonResponse = JSON.stringify(response, null, 2);

    // Display the JSON message in a popup
    alert(jsonResponse);

    // Clear out the form fields
    this.reset();
});