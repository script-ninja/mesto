export default class Section {
  // items - массив данных для вставки на страницу при инициализации класса
  // renderer - функция создания и отрисовки данных
  // containerSelector - селектор контейнера для вставки данных
  // Нужен публичный метод для отрисовки всех данных
  // addItem - публичный метод добавляющий элемент в контейнер
  constructor({ items, renderer, isEmpty }, containerSelector) {
    this._items = items;
    this._renderItem = renderer;
    this._container = document.querySelector(containerSelector);
    this.isEmpty = isEmpty; // вернет true, если контейнер пустой
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderItem(item);
    });
  }

  addItem(item, position) {
    this._container[position](item);
  }
}
