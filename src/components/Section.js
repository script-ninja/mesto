export default class Section {
  constructor({ items, renderer, isEmpty, toggleEmptyMessage, handleItemRemoval }, containerSelector) {
    this._items = items;
    this._renderItem = renderer;
    this._container = document.querySelector(containerSelector);
    this.isEmpty = isEmpty;
    this.toggleEmptyMessage = toggleEmptyMessage;
    this._container.addEventListener('click', handleItemRemoval.bind(this));
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderItem(item);
    });
  }

  addItem(item, position) {
    this._container[position](item);
    this.toggleEmptyMessage();
  }
}
