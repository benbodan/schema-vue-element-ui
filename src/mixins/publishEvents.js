
export default {
    methods: {
        publishEvent(topic, payload){
            this.$schemaEvents.$emit(topic, payload);

            if(process.env.NODE_ENV === 'test'){
                this.$emit(topic, payload);
            }
        }
    }
}