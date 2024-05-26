document.addEventListener('DOMContentLoaded', () => {
    async function getUser({ currentLoggedInUserEmail, api }) {
        const params = {
            "email": currentLoggedInUserEmail
        };

        var url = new URL(api);
        url.search = new URLSearchParams(params).toString();


        // send email and password to server
        const response = await fetch(url);
        const status = response.status;
        const data = await response.json();

        // Return the result only if the status is 200 (OK), else return false
        return status === 200 ? data : false;

    }

    async function fetchData() {
        // Read the current logged in user from JWT stored in localstorage and decode it to get the email
        // https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
        var token = window.localStorage.getItem("token");
        // console.log(token);
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        var currentLoggedInUserEmail = JSON.parse(jsonPayload).sub
        console.log(currentLoggedInUserEmail);

        const api = "http://localhost:8080/profile/api/user";
        const result = await getUser({ currentLoggedInUserEmail, api });
        console.log(result);
    }

    fetchData();
})