async function logIn({email, password, api}){
    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    };

    // send email and password to server
    const response = await fetch(api, request);
    const status = response.status;
    const data = await response.json();

    // Return the result only if the status is 200 (OK), else return false
    return status === 200 ? data : false;

}
