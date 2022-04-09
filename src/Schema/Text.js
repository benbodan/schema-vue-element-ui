/* eslint-disable */

import Component from "./Component";

class Text extends Component {
    constructor(props = {
        value: ''
    }) {
        super()
        super.setup(props)
        return this.json()
    }

    json() {
        return {
            type: 'vText',
            props: {
                value: this.value,
            }
        }
    }
}

export default Text;