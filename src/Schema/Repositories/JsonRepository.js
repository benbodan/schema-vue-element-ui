/* eslint-disable */

import Repository from "./Repository";

class JsonRepository extends Repository {

    constructor(props = {
        response: {},
    }) {
        super()
        super.setup(props)
        return this.json()
    }

    json() {
        return {
            type: 'Json',
            props: {
                response: this.response,
            }
        }
    }
}

export default JsonRepository;