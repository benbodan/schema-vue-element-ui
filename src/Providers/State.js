var _ = require('lodash');

class State {
    constructor(store, name){
        this.store = store;
        this.name = name
    }

    dispatch(action, payload = {}){
        this.store.dispatch(`${this.name}/${action}`,payload)
    }

    get(key, default_value = {}){
        let result = this.store.getters[`${this.name}/data`];

        if(!_.has(result, key)) {
            return default_value
        }
        
        return _.get(result, key);
    }

    set(key, value = {}){
        let payload = {
            key: key,
            value: value
        };
        this.store.dispatch(`${this.name}/set`, payload)
    }
}

export default State;