import "@grubersjoe/slide-menu/dist/slide-menu.js";
import { LitElement, html, customElement, property } from "lit-element";

@customElement("page-panel")
export default class PagePanel extends LitElement {
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

    setTimeout(() => {
      let panelElement = this.querySelector(".result-panel");
      this.resultPanel = new SlideMenu(panelElement, {
        showBackLink: false,
        position: "right"
      });

      panelElement.addEventListener("sm.open-after", function() {
        this.querySelector(".slide-menu__control").innerHTML = "x";
      });

      panelElement.addEventListener("sm.close-after", function() {
        this.querySelector(".slide-menu__control").innerHTML = "+";
      });
    }, 0);
  }

  toggle() {
    this.resultPanel.toggle();
  }

  open() {
    this.resultPanel.open();
  }

  close() {
    this.resultPanel.close();
  }

  prepend(content) {
    let self = this;
    self
      .querySelector(".result-list")
      .prepend(self._addAutoFadeToContent(content));
  }

  append(content) {
    let self = this;
    self
      .querySelector(".result-list")
      .append(self._addAutoFadeToContent(content));
  }

  _addAutoFadeToContent(content) {
    let fadingContent = document.createElement("div");
    fadingContent.appendChild(content);
    window.setTimeout(() => {
      fadingContent.style = "opacity: 0.5";
    }, 5000);

    return fadingContent;
  }

  render() {
    let content = html`
      <div class="result-panel slide-menu z-depth-2 bg-gray-500">
        <div
          class="slide-menu__control bg-blue-200"
          data-target="this"
          data-action="toggle"
        >
          +
        </div>
        <h4 class="text-center bg-blue-400 p-2 text-white">Result Viewer</h4>
        <div
          class="result-list m-2 w-auto h-full"
          style="overflow-y:auto; height: calc(100vh - 50px);"
        ></div>
      </div>
    `;
    return content;
  }
}
