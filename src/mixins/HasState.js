export default {
    data (){
        return {
            key: 0
        }
    },
    computed: {
        value: {
            set(value){
                this.$schemaStore.set(this.props.name, value)
                this.key++
            },
            get(){
                this.key++
                let value = this.$schemaStore.get(this.props.name, this.props.default)
                return value
            }
        }
    }
}