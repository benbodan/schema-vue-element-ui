/* eslint-disable */

import Component from "../Component";

class RestRepository extends Component {

    constructor(props = {
        get: '',
        show: '',
        update: '',
        create: '',
        delete: '',
        body: [],
        query: [],
    }) {
        super()
        super.setup(props)
        return this.json()
    }

    json() {
        return {
            type: 'Rest',
            props: {
                get: this.get,
                show: this.show,
                update: this.update,
                create: this.create,
                delete: this.delete,
                body: this.body,
                query: this.query,
            }
        }
    }
}

export default RestRepository;