<template>
  <div v-loading="loading" :key="render">
    <component
      :is="component.type"
      v-for="(component, index) in props.children"
      :properties="component.props"
      :scope="scope"
      :key="index"
    />
  </div>
</template>

<script>
import HasProperties from "@/mixins/HasProperties";
import HasState from "@/mixins/HasState";
import HasRest from "@/mixins/HasRest";
import ListenEvents from "@/mixins/ListenEvents";

export default {
  name: "vForm",
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

    // Fetch Initial Data Using Rest Repository
    this.show();

    // Listen For Events
    this.listenOn(`${this.props.name}.show`, this.show);
    this.listenOn(`${this.props.name}.post`, this.post);
    this.listenOn(`${this.props.name}.patch`, this.patch);
    this.listenOn(`${this.props.name}.put`, this.put);
    this.listenOn(`${this.props.name}.delete`, this.delete);
  },
  beforeDestroy() {
    // Stop Listening For Events
    this.stopListenOn(`${this.props.name}.show`);
    this.stopListenOn(`${this.props.name}.post`);
    this.stopListenOn(`${this.props.name}.patch`);
    this.stopListenOn(`${this.props.name}.put`);
    this.stopListenOn(`${this.props.name}.delete`);
  },
  methods: {
    // Returns The Query Parameters Used In Get Request
    queryParams() {
      return this.getComponentState("query");
    },
    body() {
      return this.getComponentState("body");
    },
    // Runs After Axios Get Request Succeeds
    updateState(response) {
      this.props.data = response;
      this.setComponentState("body", this.props.data);
    },
    afterShow(response) {
      this.updateState(response);
    },
    afterUpdate(response) {
      this.updateState(response);
    },
    afterCreate(response) {
      this.updateState(response);
    },
    afterDelete(response) {
      this.updateState(response);
    },
  },
};
</script>
