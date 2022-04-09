/* eslint-disable */
import Component from "./Component";

class Builder extends Component {
    constructor(props = {
        name: '',
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
                children: this.children,
            }
        }
    }
}

export default Builder;