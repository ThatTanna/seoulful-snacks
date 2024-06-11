// TODO: send product information (DONE)
async function saveProduct(authenticated, data={}, file=null){
    
    if(authenticated){

        // Create a FormData object to send the data via fetch api
        let formData = new FormData();
        formData.append("data", JSON.stringify(data));
        formData.append("file", file);

        const request = {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${authenticated}`
            },
            body: formData
        };
        
        const api = "http://localhost:8080/admin/api/product/add"

        // Send the request
        const response = await fetch(api, request);
        const status = response.status;
        let result = null;

        if(status === 201){
            result = await response.json();
            return result;
        }
        
        return;

    }
    return;
};

// TODO: get the product items (DONE)
async function getAdminProducts(){
    
    // Fetch data for the user's listings
    const request = {
        method: "GET",
        headers: {
            // "Authorization": `Bearer ${authenticated}`,
            "Content-Type": "application/json"
        }
    };

    const api = "http://localhost:8080/public/api/product"

    const response = await fetch(api, request);
    const status = response.status;
    let data = null;

    if(status === 200)
        data = await response.json();

    return status === 200 ? data : [];
  
};

// TODO: get product to edit (DONE)
async function getAdminProduct(authenticated, productid){
    // Fetch data for the user's listings
    const request = {
        method: "GET",
        headers: {
            // "Authorization": `Bearer ${authenticated}`,
            "Content-Type": "application/json"
        }
    };

    const api = `http://localhost:8080/public/api/product/${productid}`

    const response = await fetch(api, request);
    const status = response.status;
    let data = null;

    if(status === 200)
        data = await response.json();

    return status === 200 ? data : [];   
}

// TODO: send the product to update (DONE)
async function saveUpdatedProduct(authenticated, id, modalData={}, modalFile=null){
    
    if(authenticated){
        
        // Create a FormData object to send the data via fetch api
        let formData = new FormData();
        formData.append("data", JSON.stringify(modalData));
        formData.append("file", modalFile);
        console.log(formData.get('data'));
        console.log(formData.get('file'));
        const request = {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${authenticated}`
            },
            body: formData
        };
        
        const api = `http://localhost:8080/admin/api/product/update/${id}`
        console.log(api);
        // Send the request
        const response = await fetch(api, request);
        const status = response.status;

        if(status === 200){
            return true;
        }
        
        return;

    }
    return;
};

// TODO: send the product to deleted (DONE)
async function deleteProduct(authenticated, id){
    
    if(authenticated){
        const request = {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${authenticated}`
            }
        };
        
        const api = `http://localhost:8080/admin/api/product/delete/${id}`
        console.log(api);
        // Send the request
        const response = await fetch(api, request);
        const status = response.status;

        if(status === 200){
            return true;
        }
        
        return;

    }
    return;
};

// TODO: display products for admin (DONE)
// TODO: fill the cards and apply it to the productCardsContainer with the product Items
function addProductCard(productCardsContainer, item){
    
    const productCardArticle = document.createElement("article");
    productCardArticle.className = "row mx-auto mt-2";
    productCardArticle.style.setProperty("min-height", "280px");

    const productCardImage = document.createElement("img");
    productCardImage.className = "col-md-3";
    productCardImage.setAttribute("src", "http://localhost:8080" + item.imagePath);
    productCardArticle.appendChild(productCardImage);

    const productCardBody = document.createElement("div");
    productCardBody.className = "col-md-7 align-items-center";
    productCardArticle.append(productCardBody);

    const productCardInnerBody = document.createElement("div");
    productCardInnerBody.className = "row";
    productCardBody.append(productCardInnerBody);

    const productCardTitle = document.createElement("h5");
    productCardTitle.className = "font-weight-bold mt-4";
    productCardTitle.innerText = item.name;
    productCardInnerBody.append(productCardTitle);

    const productCardDescHeader = document.createElement("p");
    productCardDescHeader.className = "font-weight-bold text-decoration-underline";
    productCardDescHeader.innerText = "Package contain the following snacks:";
    productCardInnerBody.append(productCardDescHeader);

    const productCardDesc = document.createElement("p");
    productCardDesc.className = "snack-infor card-text px-4";
    productCardDesc.innerText = item.description;
    productCardInnerBody.append(productCardDesc);

    const productCardBodyButtons = document.createElement("div");
    productCardBodyButtons.className = " col-md-2 align-items-center";
    productCardArticle.append(productCardBodyButtons);

    const productButtonsDivider = document.createElement("div");
    productButtonsDivider.className = "row align-items-center mt-4";
    productCardBodyButtons.append(productButtonsDivider);


    const productEditButton = document.createElement("button");
    productEditButton.className = "btn btn edit btn-primary";
    productEditButton.setAttribute("type","button");
    productEditButton.setAttribute("data-bs-toggle","modal");
    productEditButton.setAttribute("data-bs-target", "#editModal");
    productEditButton.setAttribute("data-bs-whatever","@getbootstrap"); 
    productEditButton.innerText = "Edit Product";
    productEditButton.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        
        // TODO: append the hash to the url for the package to edit (DONE)        
        window.location.hash = `edit=${item.id}`;
    })
    productButtonsDivider.append(productEditButton);

    const productDeleteButton = document.createElement("button");
    productDeleteButton.className = "btn my-2";
    productDeleteButton.setAttribute("type","button");
    productDeleteButton.setAttribute("data-bs-toggle","modal");
    productDeleteButton.setAttribute("data-bs-target", "#deleteModal");
    productDeleteButton.setAttribute("data-bs-whatever","@getbootstrap"); 
    productDeleteButton.innerText = "Delete Product";
    productDeleteButton.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        // TODO: append the hash to the url for the package to edit (DONE)        
        window.location.hash = `delete=${item.id}`;
    })
    productButtonsDivider.append(productDeleteButton);

    productCardsContainer.appendChild(productCardArticle);

}