export default class Section {
  constructor({ renderer, isEmpty, toggleEmptyMessage, handleItemRemoval }, containerSelector) {
    this._items = null;
    this._renderItem = renderer;
    this._container = document.querySelector(containerSelector);
    this.isEmpty = isEmpty;
    this.toggleEmptyMessage = toggleEmptyMessage;
    this._container.addEventListener('click', handleItemRemoval.bind(this));
  }

  get container() {
    return this._container;
  }

  renderItems(items) {
    this._items = items;
    if (items) {
      items.forEach((item) => {
        this._renderItem(item);
      });
    }
  }

  addItem(item, isFirst = false) {
    this._container[isFirst ? 'prepend' : 'append'](item);
    this.toggleEmptyMessage();
  }
}
