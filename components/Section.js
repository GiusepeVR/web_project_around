export default class Section {
  constructor({ items, renderer }, sectionSelector) {
    this._items = items;
    this._renderer = renderer;
    this._sectionElement = document.querySelector(sectionSelector);
  }

  setItems() {
    this._items.forEach((element) => {
      this._renderer(element);
    });
  }

  addItem(element) {
    this._sectionElement.prepend(element);
  }
}
