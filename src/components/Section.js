export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = containerSelector;
      }

      setItems(items) {
        this._items = items;
      }
    
      renderItems() {
        this._items.forEach((item) => {
          this._renderer(item);
        });
      }
    
      addItems(element) {
        this._container.prepend(element);
      }
    }