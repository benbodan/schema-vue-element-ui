
import page from '@/components/Page'
import row from '@/components/Row'
import column from '@/components/Column'
import card from '@/components/Card'
import input from '@/components/Input'
import store from "@/store"
import State from "@/Providers/State"
const components = {
    install(Vue, options) {

        if (!options || !options.store) { throw new Error('Please initialise schema ui with a Vuex store.') }

        options.store.registerModule('schema', store)

        Vue.prototype.$schemaStore = new State(options.store, 'schema');

        Vue.component(page.name, page)
        Vue.component(row.name, row)
        Vue.component(column.name, column)
        Vue.component(card.name, card)
        Vue.component(input.name, input);
    }
}

export default components;