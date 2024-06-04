// TODO: decode the email from the authentication token
// Decodes the token for the user's email.
function decodeUser(authenticated){
    // get the authenticated user's email from the token
    const arrToken = authenticated.split(".");
    const decodedToken = JSON.parse(window.atob(arrToken[1]));
    const email = decodedToken.sub;
    return email;
}

// TODO: Admin Authenication (DONE)
function adminauth(){
    
    const token = window.localStorage.getItem("token");
    
    if(!token){
        var url = window.location.origin;
        url += "/adminlogin.html";
        if(url.indexOf("?") > 0) {
            url = url.substring(0, url.indexOf("?"));
        } 

        window.location.replace(url);
        return;
    }

    return token;
}

// TODO Clear authentication token (DONE)
function clearToken(){
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("refreshToken");
}