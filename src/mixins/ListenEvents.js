export default {
    methods: {
        listenOn(topic,  callback){
            this.$schemaEvents.$on(topic, callback)
        },
        stopListenOn(topic) {
            this.$schemaEvents.$off(topic)
        }
    }
}