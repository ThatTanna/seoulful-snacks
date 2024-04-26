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
  