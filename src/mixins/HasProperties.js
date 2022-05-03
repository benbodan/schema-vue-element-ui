import Vue from 'vue';
var _ = require('lodash');

export default {
    methods: {
        applyProperties(properties) {
            Object.keys(properties).forEach(key => {
                Vue.set(this.props, key, this.replaceVars(properties[key]))
            })
        },
        replaceVars(text, key = null) {
            const regex = /{[{]?(.*?)[}]?}/;

            if (typeof text === 'string') {
                let match = text.match(regex)

                // Replace All matches in the string
                while (match) {
                    let key = match[1]
                    if (_.has(this.scope, key)) {
                        let val = _.get(this.scope, key)
                        text = text.replace(regex, val)
                    }
                    match = text.match(regex)
                }
            } else if (typeof text === 'object') {
                this.replaceObject(text)
            }

            return text
        },
        replaceObject(props) {
            Object.keys(props).forEach(key => {
                if (key != 'children') {
                    Vue.set(props, key, this.replaceVars(props[key]))
                }
            })

            return props;
        }
    }
}