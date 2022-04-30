
class StateRepository {
    constructor(options = {}, store) {
        this.options = options;
        this.store = store;
    }

    get() {
        let results = this.store.get(this.options.name, this.options.default)
        this.getCallback(results)
    }

    afterGet(getCallback) {
        this.getCallback = getCallback
    }
}

export default StateRepository;