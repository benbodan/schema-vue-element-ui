/* eslint-disable */
import Component from "./Component";

class Builder extends Component {
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
            type: 'vBuilder',
            props: {
                name: this.name,
                data: this.data,
                repository: this.repository,
                children: this.children,
            }
        }
    }
}

export default Builder;