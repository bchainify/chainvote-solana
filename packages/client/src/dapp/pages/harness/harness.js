import DappLib from "@decentology/dappstarter-dapplib";
import DOM from "../../../lib/components/shared/dom";
import "../../../lib/components/shared/action-card.js";
import "../../../lib/components/shared/action-button.js";
import "../../../lib/components/widgets/text-widget.js";
import "../../../lib/components/widgets/number-widget.js";
import "../../../lib/components/widgets/account-widget.js";
import "../../../lib/components/widgets/upload-widget.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import { LitElement, html, customElement, property } from "lit-element";

@customElement("harness-page")
export default class HarnessPage extends LitElement {
  @property()
  get;
  @property()
  post;
  @property()
  title;
  @property()
  category;
  @property()
  description;

  createRenderRoot() {
    return this;
  }
  constructor(args) {
    super(args);
  }

  getPages() {
    return[
    {
        "name": "hello_dev",
        "title": "Hello Dev",
        "description": "Simple read and write example. This module is required for the Beta.",
        "category": "Examples",
        "route": "/hello_dev"
    }, {
        "name": "Chainvote",
        "title": "Chainvote Dapp",
        "description": "Governance voting Dapp.",
        "category": "Examples",
        "route": "/chainvote"
    }
]; 
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
    let content = html`
      <div class="container m-auto">
        <div class="row fadeIn mt-3 p-2 block">
          <p class="mt-3">
            Welcome to the UI Harness! Each feature module you selected for your project 
            has a page that demonstrates all of the module's capabilities with a user interface. 
            
            You can try the various features, then copy code selectively to your Dapp page. To continue, 
            select a feature module!        
          </p>
        </div>
        <ul class="mt-3 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        ${this.getPages().map(page =>
              html`<li class="col-span-1 bg-white rounded-lg shadow h-64">
                      <div class="flex flex-col items-center p-6 h-full">
                        <div class="font-bold text-xl mb-2">${page.title}</div>
                        <p class="text-gray-700 text-base mb-3">${page.description}</p>
                        <div class="flex flex-row flex-grow">
                            <button
                              @click=${this.handleClick}
                              data-link=${page.name}
                              class="self-end text-white font-bold py-2 px-8 rounded bg-green-500 hover:bg-green-700"}"
                            >
                              View
                            </button>
                          </div>
                      </div>
                    </li>`)
        }
        </ul>
      </div>
    `; 
    return content;

  }
}


