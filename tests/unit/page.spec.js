import { mount, shallowMount } from '@vue/test-utils'
import Page from '@/components/Page.vue'
import Row from '@/components/Row.vue'

import install from '../install';

import RowSchema from '@/Schema/Row';


describe('Page Component', () => {
  const props = {
    body: [
      new RowSchema(),
      new RowSchema()
    ]
  }

  const wrapper = mount(Page, {
    propsData: {
      properties: props
    }
  })

  it('it renders rows', () => {
    // Has 2 Children in body
    expect(wrapper.findAllComponents(Row).length).toBe(2)

    // Contains .el-row class
    expect(wrapper.find('.el-row').text())
  })


})
