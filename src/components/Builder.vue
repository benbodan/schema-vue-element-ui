<template>
  <div v-if="!loading" :key="render">
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
import ListenEvents from "@/mixins/ListenEvents";
import SupportsRepositories from "@/mixins/SupportsRepositories";

export default {
  name: "vBuilder",
  mixins: [HasProperties, HasState, ListenEvents, SupportsRepositories],
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
      render: 1,
      loading: false,
      repository: null,
      props: {
        key: "",
        name: "",
        repository: {},
        children: [],
        data: [],
      },
    };
  },
  beforeMount() {
    this.applyProperties(this.properties);

    // Init Repository & Fetch Items
    this.initRepository();

    // Listen For Events
    this.listenOn(`${this.props.name}.get`, this.get);
  },
  beforeDestroy() {
    // Stop Listening For Events
    this.stopListenOn(`${this.props.name}.get`);
  },
  methods: {
    // Returns The Query Parameters Used In Get Request
    queryParams() {
      return this.getComponentState("query");
    },
    updateState(response) {
      this.props.data = this.getResponse(response, this.props.key);
      this.setComponentState("items", this.props.data);
    },
    init(){
      this.get();
    },
  },
};
</script>
