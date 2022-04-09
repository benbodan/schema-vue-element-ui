<template>
  <div>{{ props.value }}</div>
</template>

<script>
import HasProperties from "@/mixins/HasProperties";

export default {
  name: "vText",
  mixins: [HasProperties],
  props: {
    properties: {
      type: Object,
      default() {
        return {};
      },
    },
    scope: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      props: {
        value: "",
      },
    };
  },
  beforeMount() {
    this.applyProperties(this.properties);
  }
};
</script>
