export default class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._data.forEach(item => {
      this._renderer(item);
  });
}

  addItems(element) {
    this._container.prepend(element);
  }

  clearItems() {
    this._container.innerHTML = ''; 
  }

  renderInitialItems(items) {
    this.clearItems(); 
    items.forEach(item => {
      this._renderer(item);
    });
  }
}