
// Get list of countries via restcountries API
const select = document.getElementById("countries");

fetch("https://restcountries.com/v3.1/all")
    .then(response => response.json())
    .then(data => {
        // Sort the data by country name in ascending order (A to Z)
        data.sort((a, b) => a.name.common.localeCompare(b.name.common));

        // Add options to the dropdown
        data.forEach(country => {
            const option = document.createElement("option");
            option.value = country.cca3;
            option.textContent = country.name.common;
            select.appendChild(option);
        });
    });


 async function addSubscription(authenticated, product_id, {email, mailing_address, qty}){
        const request = {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${authenticated}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                mailing_address: mailing_address,
                qty: qty
            })
        };
    
        // send the request to add the submission to the server
        const api = `http://localhost:8080/user/api/subscription/add/${product_id}`
        const response = await fetch(api, request);
        const status = response.status;
    
        // Return the result only if the status is 200 (OK), else return false
        return status === 201 ? true : false;
    
    }
    