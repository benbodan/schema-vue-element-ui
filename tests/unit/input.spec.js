import { mount, shallowMount } from '@vue/test-utils'
import install from '../install';

import Input from '@/components/Input'
import stateMock from '../Mocks/StateMock'


describe('Input Components', () => {

    it('it displays the initial value stored in the state',() => {

        const $schemaStore = stateMock({
            user: {
                email: 'user@email.com'
            }
        })

        const props = {
            name: 'user.email'
        }

        const wrapper = mount(Input, {
            mocks: {
                $schemaStore
            },
            propsData: {
                properties: props
            }
        })

        let input = wrapper.find('input[type="text"]');
        expect(input.element.value).toBe('user@email.com')
    })

    it('it displays the latest stored value when the state updates', async () => {

        const $schemaStore = stateMock({
            user: {
                email: 'user@email.com'
            }
        })

        const props = {
            name: 'user.email'
        }

        const wrapper = mount(Input, {
            mocks: {
                $schemaStore
            },
            propsData: {
                properties: props
            }
        })

        wrapper.vm.$schemaStore.set('user.email', 'user@example.com')
        await wrapper.vm.$nextTick()

        let input = wrapper.find('input[type="text"]');
        expect(input.element.value).toBe('user@example.com')
    })

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