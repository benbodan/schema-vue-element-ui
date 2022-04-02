<template>
<div>
  <label for="" v-if="props.label">
    {{props.label}}
  </label>
  <el-input 
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

export default {
  name: "vInput",
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
      value: '',
      props: {
        label: '',
        type: 'text',
        placeholder: '',
        clearable: false,
        maxlength: null,
        minlength: null,
        prefixIcon: '',
        suffixIcon: '',
        showPassword: false,
        showWordLimit: false,
        rows: 2,
        autosize: false,
      },
    };
  },
  beforeMount() {
    this.applyProperties(this.properties);
  },
};
</script>
