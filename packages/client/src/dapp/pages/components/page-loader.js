import DOM from "../../../lib/components/shared/dom";
import { LitElement, html, customElement, property } from "lit-element";

@customElement("page-loader")
export default class PageLoader extends LitElement {
  @property()
  name;
  @property()
  route;

  createRenderRoot() {
    return this;
  }

  pageContent = null;

  render() {
    return html`
      <div class="xl:col-start-2 xl:col-span-2 lg:col-start-1">
        <main id="content" class="p-5">${this.pageContent}</main>
      </div>
    `;
  }

  async load(page, pages) {

    let pageItem = pages.find(item => item.name === page);
    if (!pageItem) {
      return;
    }

    window.history.pushState(null, pageItem.title, pageItem.route);

    if (pageItem == null) {
      let pageName = location.href.split("/").pop();
      if (pageName !== "") {
        pageItem = pages.find(x => x.name == pageName);
      } else {
        pageItem = pages[0];
      }
    }

    this.classList.add("relative", "grid", "xl:grid-cols-4", "lg:grid-cols-1");
    this.setAttribute("style", "top: 70px");

    try {
      if (pageItem.name === 'dapp') {
        await import(`../../pages/${pageItem.name}.js`);
      } else if (pageItem.name === 'harness') {
        await import(`../../pages/harness/${pageItem.name}.js`);
      } else {
        await import(`../../pages/harness/${pageItem.name}-page.js`);
      }
      let pageName = pageItem.name.replace("_", "-") + "-page";

      this.pageContent = DOM.create(pageName, {
        title: pageItem.title,
        description: pageItem.description,
        category: pageItem.category
      });
    } catch (e) {
      console.log(e);
      this.pageContent = DOM.div(
        `Error loading content page for "${pageItem.title}"`
      );
    }
    this.requestUpdate();
  }
}
