<template>
  <div>
    <v-page :properties="props" />
  </div>
</template>

<script>
import Row from "@/Schema/Row";
import Column from "@/Schema/Column";
import Card from "@/Schema/Card";
import Input from "@/Schema/Input";
export default {
  data() {
    return {
      props: {},
    };
  },
  beforeMount() {
    this.props = {
      body: [
        new Row({
          gutter: 10,
          columns: [
            new Column({
              md: 12,
              children: [
                new Card({
                  children: [new Input({
                      label: 'Label',
                      clearable: true,
                      placeholder: 'Placeholder',
                      prefixIcon: 'el-icon-date',
                      maxlength:10,
                      showWordLimit: true
                  })],
                }),
              ],
            }),
            new Column({
              md: 12,
              children: [new Card()],
            }),
          ],
        }),
        new Row(),
      ],
    };
  },
  methods: {},
};
</script>
