<template>
  <el-col
    :span="props.span"
    :offset="props.offset"
    :push="props.push"
    :pull="props.pull"
    :xs="props.xs"
    :sm="props.sm"
    :md="props.md"
    :lg="props.lg"
    :xl="props.xl"
  >
    <component
      :is="component.type"
      v-for="(component, index) in props.children"
      :properties="component.props"
      :scope="scope"
      :key="index"
    />
  </el-col>
</template>

<script>
import HasProperties from "@/mixins/HasProperties";

export default {
  name: "vCol",
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
        span: 24,
        offset: 0,
        push: 0,
        pull: 0,
        xs: 24,
        sm: 24,
        md: 24,
        lg: 24,
        xl: 24,
        children: [],
      },
    };
  },
  beforeMount() {
    this.applyProperties(this.properties);
  },
};
</script>
