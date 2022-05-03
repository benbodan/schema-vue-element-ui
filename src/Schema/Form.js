/* eslint-disable */
import Component from "./Component";

class Form extends Component {
    constructor(props = {
        name: '',
        repository: {},
        fetch: true,
        data: [],
        children: [],
    }) {
        super()
        super.setup(props)
        return this.json()
    }

    json() {
        return {
            type: 'vForm',
            props: {
                name: this.name,
                data: this.data,
                fetch: this.fetch,
                repository: this.repository,
                children: this.children,
            }
        }
    }
}

export default Form;