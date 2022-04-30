/* eslint-disable */

import Repository from "./Repository";

class StateRepository extends Repository {

    constructor(props = {
        name: '',
    }) {
        super()
        super.setup(props)
        return this.json()
    }

    json() {
        return {
            type: 'State',
            props: {
                name: this.name,
            }
        }
    }
}

export default StateRepository;