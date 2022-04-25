<template>
  <div>
    <label for="" v-if="props.label">
      {{ props.label }}
    </label>
    <el-input
      @change="onChange"
      :clearable="props.clearable"
      v-model="value"
      :label="props.label"
      :type="props.type"
      :maxlength="props.maxlength"
      :minlength="props.minlength"
      :show-word-limit="props.showWordLimit"
      :placeholder="props.placeholder"
      :show-password="props.showPassword"
      :prefixIcon="props.prefixIcon"
      :suffixIcon="props.suffixIcon"
      :rows="props.rows"
    />
  </div>
</template>

<script>
import HasProperties from "@/mixins/HasProperties";
import HasState from "@/mixins/HasState";
import publishEvents from "@/mixins/publishEvents";

export default {
  name: "vInput",
  mixins: [HasProperties, HasState, publishEvents],
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
        label: "",
        name: "",
        default: "",
        type: "text",
        placeholder: "",
        clearable: false,
        maxlength: null,
        minlength: null,
        prefixIcon: "",
        suffixIcon: "",
        showPassword: false,
        showWordLimit: false,
        rows: 2,
        autosize: false,
        on_change: []
      },
    };
  },
  beforeMount() {
    this.applyProperties(this.properties);
  },
  methods: {
    onChange() {
      if(!this.props.on_change){
        return
      }
      this.props.on_change.forEach((event) => {
        this.publishEvent(event.topic, event.payload);
      });
    },
  },
};
</script>
