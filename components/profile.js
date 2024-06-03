document.addEventListener('DOMContentLoaded', () => {
    async function getUser({ currentLoggedInUserEmail, api }) {
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

    async function getUserSubscription({ currentLoggedInUserEmail, api }) {
        var url = new URL(api + "/" + currentLoggedInUserEmail);
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

        // Get profile
        var api = "http://localhost:8080/profile/api/user";
        var result = await getUser({ currentLoggedInUserEmail, api });

        if (result) { // If there's valid result
            console.log(result);
            document.getElementById('name').value = result.name;
            document.getElementById('email').value = result.email;
            document.getElementById('billingAddress').value = result.billingAddress;
        }

        // Get subscriptions
        api = "http://localhost:8080/user/api/subscription";
        result = await getUserSubscription({ currentLoggedInUserEmail, api });

        if (result) { // If there's valid result
            console.log(result);
            // Show and hide elements depending on number of subscriptions
            if (!result || result.length == 0) {
                document.getElementById("subscription-none").style.display = 'flex';
                document.getElementById("subscription-exists").style.display = 'none';
            } else { // If got more than one subscription
                document.getElementById("subscription-none").style.display = 'none';
                document.getElementById("subscription-exists").style.display = 'flex';
                var subscriptionsHTMLelements = ''+
                '<div class="container m-3">'+
                    '<div class="row">'
                    for (let i = 0; i < result.length; i++) {
                        subscriptionsHTMLelements += ''+
                        '<div class="col-md-12">'+
                            '<span class="text-secondary ms-3">Subscription period: '+new Date(result[i].created_on).toISOString().split('T')[0]+' to '+new Date(result[i].expired_on).toISOString().split('T')[0]+'</span><br />'+
                            '<div class="border rounded-3 p-2 mb-4 d-flex align-items-center justify-content-between">'+
                                '<div class="d-flex align-items-center">'+
                                    '<img class="border rounded me-2" width="100px" src="'+"http://localhost:8080"+result[i].product.imagePath+'">'+
                                    '<div class="">Subscription '+(i+1)+': <span class="fw-bold">'+result[i].product.name+'</span>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="d-flex align-items-center">'+
                                '<div class="m-4 fw-bold">Qty: '+result[i].quantity+'</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'
                    }

                    subscriptionsHTMLelements += ''+
                    '</div>'+
                '</div>'
                $('#subscription-exists').append(subscriptionsHTMLelements);
            }
        }
    }

    fetchData();
})