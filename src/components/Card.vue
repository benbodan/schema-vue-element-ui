<template>
  <el-card :shadow="props.shadow">
    <div slot="header" v-if="props.header && props.header.length">
      <component
        :is="component.type"
        v-for="(component, index) in props.header"
        :properties="component.props"
        :key="index"
      />
    </div>
    <component
      :is="component.type"
      v-for="(component, index) in props.children"
      :properties="component.props"
      :key="index"
    />
  </el-card>
</template>

<script>
import HasProperties from "@/mixins/HasProperties";

export default {
  name: "vCard",
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
        children: [],
        header: [],
        shadow: "always",
      },
    };
  },
  beforeMount() {
    this.applyProperties(this.properties);
  },
};
</script>
