import { mount, shallowMount } from '@vue/test-utils'
import install from '../install';

import Input from '@/components/Input'
import Card from '@/components/Card'
import Row from '@/components/Row'
import RowSchema from '@/Schema/Row'

describe('Input Components', () => {

    it('it renders input text', () => {

        const props = {}

        const wrapper = mount(Input, {
            propsData: {
                properties: props
            }
        })
        expect(wrapper.find('[type="text"]').exists()).toBe(true);
    })

    it('it renders input textarea', () => {

        const props = {
            rows: 10,
            type: 'textarea'
        }
        
        const wrapper = mount(Input, {
            propsData: {
                properties: props
            }
        })
        let component = wrapper.find('textarea');

        expect(component.exists()).toBe(true);
        expect(component.attributes().rows).toBe("10")
    })

    it('it displays the label property', () => {

        const props = {
            label: 'My Label'
        }
        
        const wrapper = mount(Input, {
            propsData: {
                properties: props
            }
        })
        let component = wrapper.find('input');
        
        expect(component.exists()).toBe(true);
        expect(wrapper.find('label').text()).toContain(props.label)
    })

    it('it displays the prefix icon', () => {

        const props = {
            prefixIcon: 'el-icon-date'
        }
        
        const wrapper = mount(Input, {
            propsData: {
                properties: props
            }
        })
        expect(wrapper.find('i').classes()).toContain(props.prefixIcon)
    })

    it('it displays the suffix icon', () => {

        const props = {
            suffixIcon: 'el-icon-date'
        }
        
        const wrapper = mount(Input, {
            propsData: {
                properties: props
            }
        })
        expect(wrapper.find('i').classes()).toContain(props.suffixIcon)
    })

    it('it displays the placeholder', () => {

        const props = {
            placeholder: 'Placeholder Test'
        }
        
        const wrapper = mount(Input, {
            propsData: {
                properties: props
            }
        })
        expect(wrapper.find('input').attributes().placeholder).toContain(props.placeholder)
    })

    it('it updates its input value', () => {

        const props = {
            clearable: true
        }
        
        const wrapper = mount(Input, {
            propsData: {
                properties: props
            }
        })

        let input = wrapper.find('input[type="text"]')
        input.element.value = 'test'
        input.trigger('input')

        expect(wrapper.vm.value).toBe('test')
    })
})