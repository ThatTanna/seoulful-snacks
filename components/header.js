class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
      <header>
      <nav class="navbar navbar-expand-md" aria-label="site navigation bar">
        <div class="container-fluid">
          <a class="navbar-brand" href="/index.html"><img src="images/logos/seoulful-snacks-logo.png" class="logo" /></a>
  
          <!-- Burger Menu that targets the navigation with the id siteMenu -->
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#siteMenu"
            aria-controls="siteMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
  
          <div class="collapse navbar-collapse" id="siteMenu">
            <ul class="navbar-nav ms-auto mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Subscribe Now!</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="about.html">About</a>
              </li>
              <li class="nav-item">
              <a class="nav-link" href="contact.html">Contact</a>
              </li>
              <li class="nav-item">
              <a class="nav-link" href="login.html" >Login</a>
              </li>
              <li class="nav-item">
              <a class="nav-link" href="/cart.html" >Cart</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
      `;
    }
}

customElements.define('header-component', Header);
