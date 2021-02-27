import { LitElement, html, customElement, property } from "lit-element";

@customElement("switch-widget")
export default class SwitchWidget extends LitElement {
  @property({ type: String })
  field = "";

  @property({ type: String })
  label = "";

  createRenderRoot() {
    return this;
  }

  constructor(args) {
    super(args);
  }

  render() {
    this.style.display = "block";
    if (this.nextSibling) {
      this.classList.add("mb-3");
    }
    return html`
      <div class="input-group">
        <div class="custom-control custom-switch">
          <input
            type="checkbox"
            data-field="${this.field}"
            class="custom-control-input"
            id="switch-${this.field}"
          />
          <label class="custom-control-label" for="switch-${this.field}"
            >${this.label}</label
          >
        </div>
      </div>
    `;
  }
  value() {
    return this.querySelector(`[data-field=${this.field}]`).checked;
  }
}
