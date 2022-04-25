export default {
    data() {
        return {
            key: 0
        }
    },
    methods: {
        setComponentState(key, value) {
            this.$schemaStore.set(`${this.props.name}.${key}`, value)
        },
        getComponentState(key) {
            return this.$schemaStore.get(`${this.props.name}.${key}`, this.props.default)
        },
    },
    computed: {
        value: {
            set(value) {
                this.$schemaStore.set(this.props.name, value)
                this.key++
            },
            get() {
                this.key++
                let value = this.$schemaStore.get(this.props.name, this.props.default)
                return value
            }
        }
    }
}