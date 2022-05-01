
class StateRepository {
    constructor(options = {}) {
        this.options = options;
    }

    get() {
        let results = this.options.response
        this.getCallback(results)
    }

    afterGet(getCallback) {
        this.getCallback = getCallback
    }
}

export default StateRepository;