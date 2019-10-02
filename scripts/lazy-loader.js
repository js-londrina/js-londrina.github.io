/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */

export default class ImageLoader {
  constructor() {
    this.loadingElement = document.querySelector('.loading');
    this._queue = 0;
  }

  set queue(value) {
    this._queue += value;
  }

  get queue() {
    return this._queue;
  }

  setState(toAdd) {
    if (toAdd === true) this.queue = 1;
    else if (this.queue > 0) this.queue = -1;

    if (this.queue > 0) {
      this.loadingElement.classList.add('active');
    } else this.loadingElement.classList.remove('active');
  }

  load(image, src, callback) {
    const pointer = image;

    function loaded() {
      pointer.loaded = true;
      this.setState(false);
      if (typeof callback === 'function') callback();
    }

    if (pointer.loading !== true && pointer.loaded !== true) {
      pointer.loading = true;
      this.setState(true);

      pointer.addEventListener('load', loaded.bind(this));
      pointer.addEventListener('error', () => this.setState(false));

      pointer.src = src || pointer.dataset.src;
    }
  }
}
