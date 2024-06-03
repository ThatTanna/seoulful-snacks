document.addEventListener('DOMContentLoaded', () => {
    async function getUsers({ currentLoggedInUserEmail, api }) {
        const params = {
            "email": currentLoggedInUserEmail
        };

        var url = new URL(api);
        url.search = new URLSearchParams(params).toString();

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }
        );
        const status = response.status;
        const data = await response.json();

        // Return the result only if the status is 200 (OK), else return false
        return status === 200 ? data : false;

    }

    async function fetchData() {
        // Read the current logged in user from access token JWT stored in localstorage and decode it to get the email
        // https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
        var token = window.localStorage.getItem("token");
        // console.log(token);
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        var currentLoggedInUserEmail = JSON.parse(jsonPayload).sub

        const api = "http://localhost:8080/profile/api/user";
        const result = await getUser({ currentLoggedInUserEmail, api });
        
        if (result) { // If there's valid result
            console.log(result);
            document.getElementById('name').value = result.name;
            document.getElementById('email').value = result.email;
            document.getElementById('billingAddress').value = result.billingAddress;
        }
    }

    fetchData();
})