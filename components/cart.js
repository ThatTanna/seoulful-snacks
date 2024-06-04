class Cart extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
  //   Insert here
    <section></section>
    `;
  }
}

customElements.define('cart-component', Cart);
  
// TODO: get the product cart item (DONE)
async function getCart(authenticated, package=0){
  // Fetch data for the user's listings
  if(authenticated){
      const request = {
          method: "GET",
          headers: {
              "Authorization": `Bearer ${authenticated}`,
              "Content-Type": "application/json"
          }
      };

      const api = `http://localhost:8080/restricted/api/product/${package}`

      const response = await fetch(api, request);
      const status = response.status;
      let data = null;

      if(status === 200)
        data = await response.json();

      return status === 200 ? data : [];
  }

  return;
};
