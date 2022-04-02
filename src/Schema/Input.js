/* eslint-disable */

import Component from "./Component";

class Row extends Component {
    constructor(props = {
        type: 'text',
        label: '',
        placeholder: '',
        clearable: false,
        maxlength: null,
        minlength: null,
        prefixIcon: '',
        suffixIcon: '',
        showPassword: false,
        showWordLimit: false,
        rows: 2,
        autosize: false,
    }) {
        super()
        super.setup(props)
        return this.json()
    }

    json() {
        return {
            type: 'vInput',
            props: {
                label: this.label,
                type: this.type,
                placeholder: this.placeholder,
                clearable: this.clearable,
                maxlength: this.maxlength,
                minlength: this.minlength,
                prefixIcon: this.prefixIcon,
                suffixIcon: this.suffixIcon,
                showPassword: this.showPassword,
                showWordLimit: this.showWordLimit,
                rows: this.rows,
                autosize: this.autosize
            }
        }
    }
}

export default Row;