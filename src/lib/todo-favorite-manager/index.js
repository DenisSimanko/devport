import { uniq } from "lodash";

export default class TodoFavoriteManager {
  constructor(prefix = "todo-favorite") {
    this.prefix = prefix;
  }

  getItems() {
    let storage = localStorage.getItem(this.prefix);

    if (!storage) {
      return [];
    }

    let items = JSON.parse(storage);
    return Array.isArray(items) ? items : [];
  }

  addItem(item) {
    let items = this.getItems();
    items.push(item);
    this._saveItems(uniq(items));
  }

  removeItem(item) {
    let items = this.getItems();
    items = items.filter((i) => i !== item);
    this._saveItems(items);
  }

  _saveItems(items) {
    localStorage.setItem(this.prefix, JSON.stringify(items));
  }
}
