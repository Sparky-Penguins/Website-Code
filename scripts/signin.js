window.handleCredentialResponse = (response) => {
  // const token = response.credential;

  // // Send token to backend for verification
  // decodeJwtResponse() is a custom function defined by you
  // to decode the credential response.
  //   responsePayload = decodeJwtResponse(response.credential);

  //   console.log("ID: " + responsePayload.sub);
  //   console.log("Full Name: " + responsePayload.name);
  //   console.log("Given Name: " + responsePayload.given_name);
  //   console.log("Family Name: " + responsePayload.family_name);
  //   console.log("Image URL: " + responsePayload.picture);
  //   console.log("Email: " + responsePayload.email);
  const jwtToken = response.credential; // User info is in this JWT token
  console.log("JWT Token: ", jwtToken);
};
google.accounts.id.disableAutoSelect();  // Prevents automatic sign-in
google.accounts.id.signOut();  // Signs out the user explicitly
window.localStorage.clear();  // Clears localStorage
window.sessionStorage.clear();  // Clears sessionStorage
