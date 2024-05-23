async function signUp({email, password, api}){
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
    return response;

}
