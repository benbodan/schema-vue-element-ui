<template>
  <el-button @click="onClick">{{ props.label }}</el-button>
</template>

<script>
import HasProperties from "@/mixins/HasProperties";
import publishEvents from "@/mixins/publishEvents";

export default {
  name: "vButton",
  mixins: [HasProperties, publishEvents],
  props: {
    properties: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      props: {
        label: "label",
        on_click: []
      },
    };
  },
  beforeMount() {
    this.applyProperties(this.properties);
  },
  methods: {
    onClick(){
      this.props.on_click.forEach(event => {
        this.publishEvent(event.topic, event.payload)
      })
    }
  }
};
</script>
