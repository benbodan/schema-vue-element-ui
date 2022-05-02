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
import Repository from "@/repositories/Repository";
import _ from "lodash";
export default {
  name: "vBuilder",
  mixins: [HasProperties, HasState, ListenEvents],
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
        repository: {},
        name: "",
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
    get() {
      this.repository.get(this.queryParams());
    },
    getItems(response) {
      if (!this.props.key) {
        return response;
      }

      return _.get(response, this.props.key);
    },
    updateState(response) {
      this.props.data = this.getItems(response);
      this.setComponentState("items", this.props.data);
    },
    // Initialize Rest|State Repository & Fetch Items
    initRepository() {
      this.repository = new Repository(
        this.props.repository,
        this.$schemaStore
      );
      this.repository.afterGet(this.updateState);
      this.get();
    },
  },
};
</script>
