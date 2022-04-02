<template>
    <div>
        <h1>Page Component</h1>
        {{props.title}}
    </div>
</template>

<script>
import HasProperties from '@/mixins/HasProperties'

export default  {
    name: 'v-page',
    mixins: [HasProperties],
    props: {
        properties: {
            type: Object,
            default(){
                return {}
            }
        }
    },
    data(){
        return {
            props: {
                title: ''
            }
        }
    },
    beforeMount(){
        this.applyProperties(this.properties)
    }
}
</script>
