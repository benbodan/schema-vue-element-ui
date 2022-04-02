/* eslint-disable */

import Component from "./Component";

class Column extends Component {
    constructor(props = {
        children: [],
        span: 24,
        offset: 0,
        push: 0,
        pull: 0,
        xs: 24,
        sm: 24,
        md: 24,
        lg: 24,
        xl: 24,
    }) {
        super()
        super.setup(props)
    }

    json() {
        return {
            type: 'vCol',
            props: {
                children: this.children,
                offset: this.offset,
                pull: this.pull,
                push: this.push,
                span: this.span,
                xs: this.xs,
                sm: this.sm,
                md: this.md,
                lg: this.lg,
                xl: this.xl
            }
        }
    }
}

export default Column;