import Uppy from "@uppy/core";
import UppyDashboard from "@uppy/dashboard";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import { LitElement, html, customElement, property } from "lit-element";

@customElement("upload-widget")
export default class UploadWidget extends LitElement {
  createRenderRoot() {
    return this;
  }
  @property()
  field;
  @property()
  label;
  @property()
  placeholder;
  @property()
  multiple;
  @property()
  maxsize;
  @property()
  filesChanged;

  createRenderRoot() {
    return this;
  }

  constructor(args) {
    super(args);
    this.type = "uploader";
    this.uppy = null;
    this.files = [];

    if (!this.maxsize) {
      this.maxsize = "2000000";
    }

    setTimeout(() => {
      const uploadElement = this.getElementsByClassName("upload")[0];
      if (uploadElement != null) {
        this.uppy = Uppy({
          debug: false,
          autoProceed: false,
          restrictions: {
            maxFileSize: Number(this.maxsize),
            maxNumberOfFiles: this.multiple === "true" ? 20 : 1,
            minNumberOfFiles: 1,
            allowedFileTypes: null
          }
        })
          .use(UppyDashboard, {
            id: `Dashboard-${this.uniqueId}`,
            autoProceed: false,
            hideUploadButton: true,
            hideRetryButton: true,
            hidePauseResumeButton: true,
            hideCancelButton: true,
            showSelectedFiles: true,
            proudlyDisplayPoweredByUppy: false,
            disableStatusBar: false,
            note: `${this.placeholder}<br />File size limited to ${String(
              (this.maxsize / 1000000).toFixed(0)
            )}MB`,
            inline: true,
            height: 200,
            width: (this.parentElement?.clientWidth || 0) + 300,
            target: uploadElement
          })
          .on("file-added", file => {
            this._fireFilesChangedEvent();
          })
          .on("file-removed", file => {
            this._fireFilesChangedEvent();
          });
      }
    }, 0);
  }

  render() {
    this.classList.add("mb-3");

    let content = html`
      <div id="upload-container-${this.uniqueId}" class="upload"></div>
    `;
    return content;
  }

  _fireFilesChangedEvent() {
    this.files = this.uppy.getFiles().map(f => f.data);
    let filesChangedEvent = new CustomEvent(UploadWidget.EVENT_FILES_CHANGED, {
      detail: {
        files: this.files
      }
    });
    this.dispatchEvent(filesChangedEvent);
  }
}
