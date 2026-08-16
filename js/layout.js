function currentPage() {
  return (location.pathname.split("/").pop() || "index.html").toLowerCase();
}

function isCurrent(href) {
  const page = currentPage();
  if (href === "index.html") return page === "index.html" || page === "";
  return page === href.toLowerCase();
}

function navLink(href, label) {
  const current = isCurrent(href) ? ' aria-current="page"' : "";
  return `<li><a href="${href}"${current}>${label}</a></li>`;
}

class SiteHeader extends HTMLElement {
  connectedCallback() {
    if (this.querySelector(".site-header")) return;

    this.innerHTML = `
      <header class="site-header">
        <div class="header-inner">
          <a class="brand" href="index.html">
            <img class="logo" src="images/logo.png" alt="Crestline Design Studio" />
          </a>
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Menu">
            <span class="icon"></span>
          </button>
          <nav class="site-nav" id="site-nav" aria-label="Primary">
            <ul>
              ${navLink("index.html", "Home")}
              ${navLink("services.html", "Services")}
              ${navLink("about.html", "About")}
              ${navLink("contact.html", "Contact")}
            </ul>
          </nav>
        </div>
      </header>
    `;

    const toggle = this.querySelector(".nav-toggle");
    const nav = this.querySelector(".site-nav");

    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    if (this.querySelector(".site-footer")) return;

    this.innerHTML = `
      <footer class="site-footer">
        <div class="footer-inner">
          <div class="footer-contact">
            <p>Crestline Design Studio LLC</p>
            <p>Bellingham, WA</p>
            <p>
              <a class="footer-link" href="https://www.instagram.com/crestline.design.studio/" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
                  <rect x="2.75" y="2.75" width="18.5" height="18.5" rx="5.25"></rect>
                  <circle cx="12" cy="12" r="4"></circle>
                  <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none"></circle>
                </svg>
                crestline.design.studio
              </a>
            </p>
            <p>
              <a class="footer-link" href="mailto:crestline.ds@gmail.com">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                  <path d="M4 7.5 12 13l8-5.5"></path>
                </svg>
                crestline.ds@gmail.com
              </a>
            </p>
          </div>
          <p class="footer-credit">
            Site made by
            <a href="https://www.whatcomwebsolutions.com/" target="_blank" rel="noopener noreferrer">Whatcom Web Solutions</a>
          </p>
        </div>
      </footer>
    `;
  }
}

customElements.define("site-header", SiteHeader);
customElements.define("site-footer", SiteFooter);
