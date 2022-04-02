
import page from "@/components/Page"
import row from "@/components/Row"
import column from "@/components/Column"

const components = {
    install(Vue) {
        Vue.component(page.name, page);
        Vue.component(row.name, row);
        Vue.component(column.name, column);
    }
}

export default components;