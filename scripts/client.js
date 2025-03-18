fetch(
  "https://rational-mastiff-model.ngrok-free.app/hello",
  {
    method: "GET",
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  }
)
  .then((response) => response.text()) // Get the text from the response
  .then((data) => {
    console.log(data);
    // Display the response in the div with id 'response'
    alert("This is hello from the server");
  })
  .catch((error) => {
    // Handle any errors
    console.error("Error:", error);
  });
