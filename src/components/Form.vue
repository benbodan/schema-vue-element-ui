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
import ListenEvents from "@/mixins/ListenEvents";
import Repository from "@/repositories/Repository";

export default {
  name: "vForm",
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
        repository: {},
        name: "",
        children: [],
        data: [],
      },
    };
  },
  beforeMount() {
    this.applyProperties(this.properties);

    this.initRepository();

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
      this.render++;
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
    show() {
      this.repository.show(this.queryParams());
    },
    post() {
      this.repository.post(this.body(), this.queryParams());
    },
    patch() {
      this.repository.patch(this.body(), this.queryParams());
    },
    put() {
      this.repository.put(this.body(), this.queryParams());
    },
    update() {
      this.repository.update(this.body(), this.queryParams());
    },
    delete() {
      this.repository.delete(this.body(), this.queryParams());
    },
    initRepository() {
      this.repository = new Repository(
        this.props.repository,
        this.$schemaStore
      );
      this.repository.afterGet(this.updateState);
      this.show();
    },
  },
};
</script>
