
class StateRepository {
    constructor(options = {}) {
        this.options = options;
    }

    get() {
        let results = this.options.response
        this.getCallback(results)
    }

    show() {
        this.get()
    }

    put(body) {
        this.options.response = body;
        this.getCallback(body)
    }

    delete() {
        let results = {}
        this.getCallback(results)
    }

    afterGet(getCallback) {
        this.getCallback = getCallback
    }
}

export default StateRepository;