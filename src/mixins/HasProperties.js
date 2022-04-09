import Vue from 'vue';
var _ = require('lodash');

export default {
    methods: {
        applyProperties(properties) {
            Object.keys(properties).forEach(key => {
                Vue.set(this.props, key, this.replaceVars(properties[key]))
            })
        },
        replaceVars(text){
            const regex = /{[{]?(.*?)[}]?}/;

            if(typeof text === 'string'){
                let match = text.match(regex)

                // Replace All matches in the string
                while(match){
                    let key = match[1]
                    if(_.has(this.scope, key)){
                        let val = _.get(this.scope, key)
                        text = text.replace(regex, val)
                    }
                    match = text.match(regex)
                }
            }

            return text
        },
    }
}