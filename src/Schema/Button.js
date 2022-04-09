/* eslint-disable */

import Component from "./Component";

class Button extends Component {
    constructor(props = {
        label: '',
        on_click: []
    }) {
        super()
        super.setup(props)
        return this.json()
    }

    json() {
        return {
            type: 'vButton',
            props: {
                label: this.label,
                on_click: this.on_click
            }
        }
    }
}

export default Button;