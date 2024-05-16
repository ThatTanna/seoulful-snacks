
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

