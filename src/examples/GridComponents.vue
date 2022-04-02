<template>
  <div>
    <v-page :properties="props" />
  </div>
</template>

<script>
import Row from "@/Schema/Row"
import Column from "@/Schema/Column"
export default {
  data() {
    return {
        props: {}
    }
  },
  beforeMount() {
    this.props = {
       body: [
           (new Row({
               columns: [
                   (new Column()).json()
               ]
           })).json(),
           (new Row()).json(),
       ]
    };
  },
  methods: {},
};
</script>
