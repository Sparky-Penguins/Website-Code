fetch(
  "https://3f6e-2601-405-4b00-2270-a17b-f1ac-d1a0-fc1d.ngrok-free.app/hello",
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
    alert(data);
  })
  .catch((error) => {
    // Handle any errors
    console.error("Error:", error);
  });
