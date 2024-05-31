// TODO: subscribe to the product
function subScribe(package){
    authSubscribe(package);
}


// TODO: get the product items (DONE)
async function getProducts(){
    
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


// TODO: fill the cards and apply it to the productCardsContainer with the product Items
function addProductCard(productCardsContainer, item){
    

    const productCardSection = document.createElement("section");
    productCardSection.className = "col-md-4 mt-4";
    productCardsContainer.append(productCardSection);

    const productCardArticle = document.createElement("article");
    productCardArticle.className = "product-card";
    productCardSection.append(productCardArticle);

    const productCardImage = document.createElement("img");
    productCardImage.className = "card-img-top rounded-top-4";
    productCardImage.setAttribute("src", "http://localhost:8080" + item.imagePath);
    productCardArticle.appendChild(productCardImage);

    const productCardBody = document.createElement("div");
    productCardBody.className = "card-body";
    productCardArticle.append(productCardBody);

    const productCardTitle = document.createElement("h5");
    productCardTitle.className = "font-weight-bold mt-4";
    productCardTitle.innerText = item.name;
    productCardBody.append(productCardTitle);

    const productCardDescHeader = document.createElement("p");
    productCardDescHeader.className = "font-weight-bold text-decoration-underline";
    productCardDescHeader.innerText = "Package contain the following snacks:";
    productCardBody.append(productCardDescHeader);

    const productCardDesc = document.createElement("p");
    productCardDesc.className = "snack-infor card-text px-4";
    productCardDesc.innerText = item.description;
    productCardBody.append(productCardDesc);

    const productCardButton = document.createElement("button");
    productCardButton.className = "btn btn-secondary p-2";
    productCardButton.innerText = "Subscribe here";
    productCardButton.addEventListener("click", () => {
      subScribe(item.id);
    })
    productCardBody.append(productCardButton);

    // Unused in the card
    // <p id="subscribeMessage" class="hidden-message">You have subscribed successfully!</Br></Br>
    // <a href="cart.html"><button class="btn btn-primary" id="cartActionBtn">Checkout Now
    // </button> </a>
    // <a href="products.html"> <button class="btn btn-primary" id="cartActionBtn">Back to Snacks
    // </button></a>
    // </p>

    productCardsContainer.appendChild(productCardSection);


}