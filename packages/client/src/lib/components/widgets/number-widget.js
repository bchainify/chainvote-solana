import { LitElement, html, customElement, property } from "lit-element";

@customElement('number-widget')
export default class NumberWidget extends LitElement {
  @property()
  field;
  @property()
  label;
  @property()
  placeholder;

  createRenderRoot() {
    return this;
  }

  constructor(args) {
    super(args);
  }

  render() {
    let content = html`
      <div class="input-group flex mb-3">
        <label
          class="bg-gray-200 p-2 block rounded rounded-r-none text-gray-500"
          >${this.label}</label
        >
        <input
          type="text"
          data-field="${this.field}"
          class="shadow-inner appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="${this.placeholder}"
        />
      </div>
    `;
    return content;
  }

  value() {
    return this.querySelector(`[data-field=${this.field}]`).value;
  }
}


