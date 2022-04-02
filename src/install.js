
import page from '@/components/Page'
import row from '@/components/Row'
import column from '@/components/Column'
import card from '@/components/Card'
import input from '@/components/Input'
const components = {
    install(Vue) {
        Vue.component(page.name, page)
        Vue.component(row.name, row)
        Vue.component(column.name, column)
        Vue.component(card.name, card)
        Vue.component(input.name, input)
    }
}

export default components;