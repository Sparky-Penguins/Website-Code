window.handleCredentialResponse = async (response) => {
  const jwtToken = response.credential; // This is the JWT token

  // Decode the JWT token to get user information
  const decodedToken = decodeJwtResponse(jwtToken);

  // Extract the profile picture URL
  const profilePictureUrl = decodedToken.picture;
  console.log("Profile Picture URL: ", profilePictureUrl);
  console.log(decodedToken);

  const userId = decodedToken.sub;
  console.log("User ID: ", userId);
  let admin = await adminLogin(userId);
  if (admin) {
    loadCustomerInvoices(admin);
  }

  let adminOrder = await adminOrders(userId);

  if (adminOrder) {
    loadCustomerOrders(adminOrder);
  }

  let user = await userLogin(userId);
  if (user) {
    loadCustomerInvoices(user);
  }

  let userOrder = await userOrders(userId);

  if (userOrder) {
    loadCustomerOrders(userOrder);
  }

  // Hide the Google Sign-In button
  document.getElementsByClassName("g_id_signin")[0].style.display = "none";

  // Show the profile picture and set the source
  const profilePic = document.getElementById("profilePic");
  profilePic.src = profilePictureUrl;
  document.getElementById("profileContainer").style.display = "block"; // Show profile picture
  localStorage.setItem("UserID", userId);
  localStorage.setItem("Useremail", decodedToken.email);
};

// Function to decode the JWT token
function decodeJwtResponse(token) {
  const base64Url = token.split(".")[1]; // Get the payload part
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Decode URL-safe base64
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload); // Parse the decoded string as JSON
}

window.localStorage.clear();
window.sessionStorage.clear();
