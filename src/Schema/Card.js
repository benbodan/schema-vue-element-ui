/* eslint-disable */

import Component from "./Component";

class Card extends Component {
    constructor(props = {
        children: [],
        header: []
    }) {
        super()
        super.setup(props)
        return this.json()
    }

    json() {
        return {
            type: 'vCard',
            props: {
                children: this.children,
                header: this.header,
            }
        }
    }
}

export default Card;