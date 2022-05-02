import Repository from "@/repositories/Repository";
import _ from "lodash";

export default {
    methods: {
        initRepository() {
            this.repository = new Repository(
                this.props.repository,
                this.$schemaStore
            );
            this.repository.afterGet(this.updateState);
            this.init()
        },
        get() {
            this.repository.get(this.queryParams());
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
        getResponse(response, key = null) {
            if (!key) {
                return response;
            }

            return _.get(response, key);
        },
    }
}