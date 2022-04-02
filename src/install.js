
import page from "./components/page"

const components  = {
    install(Vue) {
        Vue.component(page.name, page);
    }
}

export default components;