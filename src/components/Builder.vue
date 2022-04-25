<template>
  <div v-if="!loading">
    <div v-for="(item, j) in props.data" :key="j">
      <component
        :is="component.type"
        v-for="(component, index) in props.children"
        :properties="component.props"
        :scope="item"
        :key="index + '-' + j"
      />
    </div>
  </div>
</template>

<script>
import HasProperties from "@/mixins/HasProperties";
import HasState from "@/mixins/HasState";
import HasRest from "@/mixins/HasRest";
import ListenEvents from "@/mixins/ListenEvents";

export default {
  name: "vBuilder",
  mixins: [HasProperties, HasState, HasRest, ListenEvents],
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
      items: [],
      props: {
        repository: {},
        name: "",
        children: [],
        data: [],
      },
    };
  },
  beforeMount() {
    this.applyProperties(this.properties);

    // Builder State Items
    if (this.props.data.length > 0) {
      this.setComponentState("items", this.props.data);
    }

    //Fetch Items Using Rest Repository
    this.get();

    // Listen For Events
    this.listenOn(`${this.props.name}.get`, this.get);
  },
  beforeDestroy(){
    // Stop Listening For Events
    this.stopListenOn(`${this.props.name}.get`)
  },
  methods: {
    // Returns The Query Parameters Used In Get Request
    queryParams() {
      return this.getComponentState("query");
    },
    // Runs After Axios Get Request Succeeds
    afterGet(response) {
      this.props.data = response.data;
      this.setComponentState("items", this.props.data);
    },
  },
};
</script>
