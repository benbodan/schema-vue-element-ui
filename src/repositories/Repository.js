import RestRepository from "./RestRepository";
import StateRepository from "./StateRepository";

class Repository {
    constructor(options, store) {
        if (options.type == 'Rest') {
            return new RestRepository(options.props)
        }

        if (options.type == 'State') {
            return new StateRepository(options.props, store)
        }

        return this;
    }

    get() { }
    // eslint-disable-next-line
    afterGet(callback) {}
}

export default Repository;