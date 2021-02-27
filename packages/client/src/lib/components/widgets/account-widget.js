import { LitElement, html, customElement, property } from "lit-element";
import DappLib from "@decentology/dappstarter-dapplib";

@customElement("account-widget")
export default class AccountWidget extends LitElement {
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


    setTimeout(async () => {
      const accounts = DappLib.getAccounts();
      this.accountsLookUp = accounts;
      this.querySelector('select').innerHTML = this.displayAccountOptions();
    }, 0);
  }

  displayAccountOptions() {
    let roles = ['Admin', 'Alice', 'Birbal', 'Chen', 'Damian', 'Ezra', 'Farida'];
    let optionsString = '';
    for(let i = 0; i < this.accountsLookUp.length; i++){
      let label = `User ${i}`;
      if (roles.length > i) {
         label = roles[i];
      }
      optionsString = optionsString + `<option value="${this.accountsLookUp[i]}">${label} - ${this.accountsLookUp[i]}</option>`;
    };

    return optionsString;
  }

  render() {
    this.classList.add("mb-3", "w-full", "block");
    let content = html`
      <div class="mb-4 w-1/2">
        <div class="row">
          <div class="row pt-5">
            <label class="block text-gray-700 text-sm font-bold mb-2">
              ${this.label}
            </label>
            <div class="inline-block relative w-full">
              <select id="accountOptions" data-field="${this.field}" class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 5"><path d='M2 1 h1 v1 h1 v1 h-1 v1 h-1 v-1 h-1 v-1 h1 z'/></svg>
              </div>   
            </div>   
          </div>
        </div>
      </div>
    `;

    return content;
  }
}
