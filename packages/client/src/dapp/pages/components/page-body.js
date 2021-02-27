import DappLib from "@decentology/dappstarter-dapplib";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import { LitElement, html, customElement, property } from "lit-element";

@customElement("page-body")
export default class PageBody extends LitElement {
  @property()
  category;
  @property()
  title;
  @property()
  description;

  constructor(args) {
    super(args);
    const children = [...this.children];
    setTimeout(() => {
      for (let index = 0; index < children.length; index++) {
        const element = children[index];
        this.querySelector(".slot").append(element);
      }
    }, 0);
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <section class="p-2 mb-12">
        <div class="float-right">
          ${ unsafeHTML(DappLib.SVG_ICONS.block) }
        </div>
        <h5 class="text-gray-600">${this.category}</h5>

        <h2 class="mb-2 text-4xl text-gray-700">
          <strong>${this.title}</strong>
        </h2>
        <div class="">
          <div class="text-sm">
            ${this.description}
          </div>
        </div>
      </section>
      <div class="mt-4 slot"></div>
    `;
  }
}
