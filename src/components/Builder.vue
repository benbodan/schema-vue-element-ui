<template>
  <div>
    <div v-for="(item,index) in props.data" :key="index">
      <component
        :is="component.type"
        v-for="(component, index) in props.children"
        :properties="component.props"
        :scope="item"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
import HasProperties from "@/mixins/HasProperties";
import HasState from "@/mixins/HasState";

export default {
  name: "vBuilder",
  mixins: [HasProperties, HasState],
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
        name: "",
        children: [],
        data: []
      },
    };
  },
  beforeMount() {
    this.applyProperties(this.properties);

    // Builder State Items
    if(this.props.data.length > 0) {
      this.setComponentState('items', this.props.data)
    }
  },
};
</script>
