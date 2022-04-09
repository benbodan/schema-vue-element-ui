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
                  children: [
                    new Input({
                      label: "User Email",
                      name: "user.email",
                      clearable: true,
                      placeholder: "Placeholder",
                      prefixIcon: "el-icon-date",
                      maxlength: 20,
                      showWordLimit: true,
                    }),
                    new Input({
                      label: "User Name",
                      name: "user.name",
                      clearable: true,
                      placeholder: "Placeholder",
                      prefixIcon: "el-icon-date",
                      maxlength: 20,
                      showWordLimit: true,
                    }),
                  ],
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
  mounted() {},
  methods: {},
};
</script>
