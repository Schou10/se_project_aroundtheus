export default class Section {
  constructor({data, renderer}, containerSelector) {
    this._data = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(data) {
    data.forEach(item => {
      this._renderer(item);
  });
}

  addItems(element) {
    this._container.prepend(element);
  }


}