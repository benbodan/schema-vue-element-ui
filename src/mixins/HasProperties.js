import Vue from 'vue';

export default {
    methods: {
        applyProperties(properties) {
            Object.keys(properties).forEach(key => {
                Vue.set(this.props, key, properties[key])
            })
        }
    }
}