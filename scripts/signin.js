function onSignIn(googleUser) {
    console.log(googleUser)
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Useful for debugging
    console.log('Name: ' + profile.getName());
}