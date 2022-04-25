/* eslint-disable */
import Component from "./Component";

class Form extends Component {
    constructor(props = {
        name: '',
        repository: {},
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
                repository: this.repository,
                children: this.children,
            }
        }
    }
}

export default Form;