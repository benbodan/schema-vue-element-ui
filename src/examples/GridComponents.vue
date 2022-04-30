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
import Builder from "@/Schema/Builder";
import Button from "@/Schema/Button";
import Event from "@/Schema/Event";
import TextSchema from "@/Schema/Text";
import Form from "@/Schema/Form";

import RestRepository from "@/Schema/Repositories/RestRepository";

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
                      label: "Refersh",
                      on_click: [new Event("user_form.show", "")],
                    }),
                    new Button({
                      label: "Update",
                      on_click: [new Event("user_form.put")],
                    }),
                    new Button({
                      label: "Create",
                      on_click: [new Event("user_form.post")],
                    }),
                    new Button({
                      label: "Delete",
                      on_click: [new Event("user_form.delete")],
                    }),
                  ],
                  children: [
                    new Form({
                      name: "user_form",
                      repository: new RestRepository({
                        show: "https://62514445e3e5d24b342b12d1.mockapi.io/api/v1/users/1",
                        update:
                          "https://62514445e3e5d24b342b12d1.mockapi.io/api/v1/users/1",
                        create:
                          "https://62514445e3e5d24b342b12d1.mockapi.io/api/v1/users/",
                        delete:
                          "https://62514445e3e5d24b342b12d1.mockapi.io/api/v1/users/1",
                      }),
                      children: [
                        new Input({
                          label: "User Email",
                          name: "user_form.body.email",
                          clearable: true,
                          placeholder: "Placeholder",
                          prefixIcon: "el-icon-date",
                          maxlength: 50,
                          showWordLimit: true,
                        }),
                        new Input({
                          label: "User Name",
                          name: "user_form.body.name",
                          clearable: true,
                          placeholder: "Placeholder",
                          prefixIcon: "el-icon-date",
                          maxlength: 50,
                          showWordLimit: true,
                        }),
                      ],
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
                    new Column({
                      children: [
                        new Input({
                          label: "Name",
                          name: "users.query.name",
                          clearable: true,
                          placeholder: "Search",
                          prefixIcon: "el-icon-search",
                          on_change: [new Event("users.get", "")],
                        }),
                      ],
                    }),
                    new Builder({
                      name: "users",
                      data: [],
                      repository: new RestRepository({
                        get: "https://62514445e3e5d24b342b12d1.mockapi.io/api/v1/users",
                      }),
                      children: [
                        new Column({
                          md: 12,
                          children: [
                            new Card({
                              children: [
                                new TextSchema({
                                  value: "Name: {name}",
                                }),
                              ],
                            }),
                          ],
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
