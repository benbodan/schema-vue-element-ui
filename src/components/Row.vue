<template>
  <el-row
    :gutter="props.gutter"
    :type="props.type"
    :justify="props.justify"
    :align="props.align"
  >
    <component
      :is="component.type"
      v-for="(component, index) in props.columns"
      :properties="component.props"
      :key="index"
    />
  </el-row>
</template>

<script>
import HasProperties from "@/mixins/HasProperties";

export default {
  name: "vRow",
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
        gutter: 0,
        type: "",
        justify: "start",
        align: "",
        columns: [],
      },
    };
  },
  beforeMount() {
    this.applyProperties(this.properties);
  },
};
</script>
