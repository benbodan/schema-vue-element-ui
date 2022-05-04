var _ = require('lodash');

export default {
    methods: {
        applyProperties(properties) {
            Object.keys(properties).forEach(key => {
                _.set(this.props, key, this.replaceVars(properties[key]))
            })
        },
        replaceVars(text) {
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
                text = this.replaceObject(text)
            }

            return text
        },
        replaceInArray(items){
            return items.map(item => {
                return this.replaceVars(item)
            })
        },
        replaceObject(props) {
            let properties = JSON.parse(JSON.stringify(props))
            Object.keys(props).forEach(key => {
                if (key != 'children') {
                    _.set(properties, key, this.replaceVars(props[key]))
                }
            })

            return properties;
        }
    }
}