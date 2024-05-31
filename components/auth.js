// TODO: decode the email from the authentication token
// Decodes the token for the user's email.
function decodeUser(authenticated){
    // get the authenticated user's email from the token
    const arrToken = authenticated.split(".");
    const decodedToken = JSON.parse(window.atob(arrToken[1]));
    const email = decodedToken.sub;
    return email;
}

// TODO: General Authenication (DONE)
function auth(){
    
    const token = window.localStorage.getItem("token");
    
    if(!token){
        var url = window.location.origin;
        url += "/login.html";
        if(url.indexOf("?") > 0) {
            url = url.substring(0, url.indexOf("?"));
        } 

        window.location.replace(url);
        return;
    }

    return token;
}

// TODO: Production Subscription Authenication (DONE)
function authSubscribe(package){

    const token = window.localStorage.getItem("token");
    
    var url = window.location.origin;
    
    if(!token){
        url += "/login.html";
        if(url.indexOf("?") > 0) {
            url = url.substring(0, url.indexOf("?"));
        } 
        
        url += `?package=${package}`;
        window.location.replace(url);
        return;
    }
    
    url += "/cart.html";
    if(url.indexOf("?") > 0) {
        url = url.substring(0, url.indexOf("?"));
    } 
    
    url += `?package=${package}`;
    window.location.replace(url);
    return;
}