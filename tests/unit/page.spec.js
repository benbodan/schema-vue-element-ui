import { mount, shallowMount } from '@vue/test-utils'
import Page from '@/components/Page.vue'

describe('Page.vue', () => {
  it('renders page title when passed', () => {
    const props = {
      title: 'Page Title',
    }

    const wrapper = shallowMount(Page, {
      propsData: {
        properties: props
      }
    })

    expect(wrapper.text()).toContain(props.title)
  })
})
