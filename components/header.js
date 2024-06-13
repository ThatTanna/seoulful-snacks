class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {

    const loggedInBar = `
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
                <a class="nav-link active" aria-current="page" href="products.html">Subscribe Now!</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="about.html">About</a>
              </li>
              <li class="nav-item">
              <a class="nav-link" href="" id="linkCart">Cart</a>
              </li>
              <li class="nav-item">
              <a class="nav-link" href="logout.html" >Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <!-- toast section -->
    <!-- https://getbootstrap.com/docs/5.3/components/toasts/ --> 
    <div class="toast-container p-3 top-0 start-50 translate-middle-x">
        <!-- Put toasts within -->
        <div id="msg-toast" class="toast align-items-center mt-2" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true" data-bs-delay="4000">
            <div class="d-flex">
                <div id="msg-toast-body" class="toast-body"> 
                <!-- Message to be added here -->
                </div>
                <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    </div>
    `;

    const notLoggedInBar = `
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
                <a class="nav-link active" aria-current="page" href="products.html">Subscribe Now!</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="about.html">About</a>
              </li>
              <li class="nav-item">
              <a class="nav-link" href="login.html" >Login</a>
              </li>
              <li class="nav-item">
              <a class="nav-link" href="" id="linkCart">Cart</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <!-- toast section -->
    <!-- https://getbootstrap.com/docs/5.3/components/toasts/ --> 
    <div class="toast-container p-3 top-0 start-50 translate-middle-x">
        <!-- Put toasts within -->
        <div id="msg-toast" class="toast align-items-center mt-2" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true" data-bs-delay="4000">
            <div class="d-flex">
                <div id="msg-toast-body" class="toast-body"> 
                <!-- Message to be added here -->
                </div>
                <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    </div>
    `;

    // Retrieve user token from local storage
    const token = window.localStorage.getItem("token");
    
    if(token !== null)
      this.innerHTML = loggedInBar;
    else
      this.innerHTML = notLoggedInBar;

  }
}

customElements.define('header-component', Header);

// Cart link will be controlled based on whether a cart item or quanitity has been selected.
document.getElementById("linkCart").addEventListener("click", (event)=>{
  event.preventDefault();
  event.stopPropagation();

  let urlParams = new URLSearchParams(window.location.search);
  let package = urlParams.get("package");
  let quantity = urlParams.get("qty");

  if(package > 0 || quantity > 0){

    let url = window.location.href;

    if(url.indexOf("?") > 0) {
      url = window.location.origin + "/cart.html?"
      url += `${window.location.href.split("?")[1]}`;
    }
    window.location = url;
    return;
  }else{
    let url = window.location.origin + "/cart.html"
    window.location = url;
    return;
  }

});