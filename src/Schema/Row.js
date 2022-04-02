/* eslint-disable */

import Component from "./Component";

class Row extends Component {
    constructor(props = {
        columns: [],
        gutter: 0,
        type: '',
        justify: 'start',
        align: '',
    }) {
        super()
        super.setup(props)
        return this.json()
    }

    json() {
        return {
            type: 'vRow',
            props: {
                columns: this.columns,
                gutter: this.gutter,
                type: this.type,
                justify: this.justify,
                align: this.align
            }
        }
    }
}

export default Row;