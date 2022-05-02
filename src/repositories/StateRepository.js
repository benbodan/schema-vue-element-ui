
class StateRepository {
    constructor(options = {}, store) {
        this.options = options;
        this.store = store;
    }

    get() {
        let results = this.store.get(this.options.name, this.options.default)
        this.getCallback(results)
    }

    show() {
        this.get()
    }

    delete() {
        let results = this.store.set(this.options.name, {})
        this.getCallback(results)
    }

    post(body) {
        let results = this.store.set(this.options.name, body)
        this.getCallback(results)
    }

    update(body, queryParams) {
        console.log(body, 'update')
        this.post(body, queryParams)
    }

    put(body, queryParams) {
        this.post(body, queryParams)
    }

    patch(body, queryParams) {
        this.post(body, queryParams)
    }

    afterGet(getCallback) {
        this.getCallback = getCallback
    }
}

export default StateRepository;