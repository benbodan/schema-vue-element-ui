<template>
  <div>
    <v-page :properties="props" />
  </div>
</template>

<script>
import Row from "@/Schema/Row"
import Column from "@/Schema/Column"
import Card from "@/Schema/Card"
import Input from "@/Schema/Input"
import Builder from "@/Schema/Builder"
import Button from "@/Schema/Button"
import Event from "@/Schema/Event"
import TextSchema from '@/Schema/Text'

export default {
  data() {
    return {
      props: {},
      data: [
        {
          user: "User 1",
        },
        {
          user: "User 2",
        },
      ],
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
                  header: [
                    new Button({
                      label: 'Add',
                      on_click: [
                        new Event('topic', 'action')
                      ]
                    })
                  ],
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
              children: [
                new Row({
                  gutter: 10,
                  columns: [
                    new Builder({
                      name: "users",
                      data: this.data,
                      children: [
                        new Column({
                          md: 12,
                          children: [new Card({
                            children: [
                              new TextSchema({
                                value: 'Account : {user}'
                              })
                            ]
                          })],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
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
