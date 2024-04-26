class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <footer>
      <div class="container my-5">
        <div class="row pt-2 justify-content-start">
          <div class="col-md-9 flex-colunm">
            <p class="fs-6">Seoulful Snacks © All rights reserved.</p>
          </div>
          <div class="col-md-3 d-inline-flex">
            <div class="d-block w-75 ms-2">
              <!-- TikTok logo -->
              <img src="images/logos/tiktok-logo.png" class="sociallogo" />
              <!-- FB Logo -->
              <img src="images/logos/facebook-logo.png" class="sociallogo" />
              <!-- Instagram logo -->
              <img src="images/logos/instagram-logo.png" class="sociallogo" />
            </div>
          </div>
        </div>
      </div>
    </footer>
    `;
  }
}

customElements.define('footer-component', Footer);
