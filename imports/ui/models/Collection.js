import throttle from 'lodash/throttle';

//very simple and good library.

class Collection {
	static localStoragePrefix = '_COLLECTION_';

	storageWriteIntervalMs = 1000;

	constructor(name) {
		this._name = name;
		this._localStorageKey = `${Collection.localStoragePrefix}${name}`;

		const items = this._readFromLocalStorage();
		this._items = items || [];
	}

	reset() {
		this._items = [];
		this._writeToLocalStorage();
	}

	_readFromLocalStorage() {
		let items = null;
		try {
			const jsonString = localStorage.getItem(this._localStorageKey);
			if (jsonString) {
				items = JSON.parse(jsonString);
			}
		} catch (error) {
			console.log(error);
		}
		return items;
	}

	_writeToLocalStorage = throttle(() => {
		const items = this._items;
		try {
			const jsonString = JSON.stringify(items);
			localStorage.setItem(this._localStorageKey, jsonString);
			return true;
		} catch (error) {
			return false;
		}
	}, this.storageWriteIntervalMs);

	_generateId() {
		return Math.random().toString(36).substr(2, 9);
	}

	insert(item) {
		const _id = this._generateId();
		this._items.push({
			_id,
			...item
		});
		this._writeToLocalStorage();
	}

	find(predicate) {
		return this._items.find(predicate);
	}

	get items() {
		return this._items;
	}

	remove(id) {
		this._items = this._items.filter(({ _id }) => _id !== id);
		this._writeToLocalStorage();
	}

	update(id, newItem) {
		this._items = this._items.map((item) => {
			if (item._id === id) return { ...newItem, _id: id };
			return item;
		});
		this._writeToLocalStorage();
	}
}
export default Collection;
