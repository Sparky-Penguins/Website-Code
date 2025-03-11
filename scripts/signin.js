async function handleCredentialResponse(response) {
    const token = response.credential;

    // Send token to backend for verification
    const res = await fetch('http://localhost:3000/auth/google?token=' + token);
    const data = await res.json();
    console.log('User Info:', data);
}