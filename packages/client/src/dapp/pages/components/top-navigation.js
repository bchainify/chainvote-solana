import { LitElement, html, customElement, property } from "lit-element";
@customElement('top-navigation')
export default class TopNavigation extends LitElement {
  @property()
  collapse;
  
  createRenderRoot() {
    return this;
  }

  constructor(args) {
    super(args);
    setTimeout(() => {
      this.setPageLoader('dapp');
    }, 0);
  }

  getPages() {
    let staticPages = [
      {
        name: "dapp",
        title: "Home",
        route: "/"
      },
      {
        name: "harness",
        title: "UI Harness",
        route: "/harness"
      }
    ];
    return staticPages;
  }

  handleClick = e => {
    e.preventDefault();
    this.setPageLoader(e.target.dataset.link);
  };

  setPageLoader(name) {
    let pageLoader = document.getElementById("page-loader");
    pageLoader.load(name, this.getPages());
    this.requestUpdate();
  }

  render() {
    this.classList.add('z-10', 'fixed');
    let content = html`
      <nav
        x-data="{ open: false }"
        @keydown.window.escape="open = false"
        class="bg-white fixed w-full shadow"
      >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-center h-10">
            <div class="flex items-center">
              <div class="hidden md:block">
                <div class="ml-10 flex items-baseline">
                ${this.getPages().map(x => {
                  return html`
                    <a
                      href="#"
                      class="ml-4 px-3 py-2 rounded-md text-sm font-medium hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 ${document.location.href.endsWith(
                        x.route
                      )
                        ? "bg-gray-700 text-white"
                        : "text-gray-500"}"
                      @click=${this.handleClick}
                      data-link="${x.name}"
                      >${x.title}</a
                    >
                  `;
                })}
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </nav>
    `;
    return content;
  }
}


