<template>
  <div>
    <component
      :is="component.type"
      v-for="(component, index) in props.body"
      :properties="component.props"
      :key="index"
    />
  </div>
</template>

<script>
import HasProperties from "@/mixins/HasProperties";

export default {
  name: "vPage",
  mixins: [HasProperties],
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
        title: "",
        body: [],
      },
    };
  },
  beforeMount() {
    this.applyProperties(this.properties);
  },
};
</script>
