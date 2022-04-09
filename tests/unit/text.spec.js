import { mount } from '@vue/test-utils'
import install from '../install'
import Text from '@/components/Text'

describe('Text Component',() => {

    it('it replaces a single variable with values from the scope', () => {
        const props = {
            value: 'Email: {data.email}'
        }

        const scope = {
            data:{
                email: 'email@example.com'
            }
        }

        const wrapper = mount(Text, {
            propsData: {
                scope: scope,
                properties: props
            }
        })

        expect(wrapper.text()).toBe('Email: email@example.com')
    })

    it('it replaces a single variable with multiple matches in the same string', () => {
        const props = {
            value: 'Email: {data.email}, {data.email}'
        }

        const scope = {
            data:{
                email: 'email@example.com'
            }
        }

        const wrapper = mount(Text, {
            propsData: {
                scope: scope,
                properties: props
            }
        })

        expect(wrapper.text()).toBe('Email: email@example.com, email@example.com')
    })


    it('it replaces multiple variables in the same string', () => {
        const props = {
            value: 'User Info: {data.username}, {data.email}'
        }

        const scope = {
            data:{
                username: 'user 1',
                email: 'email@example.com'
            }
        }

        const wrapper = mount(Text, {
            propsData: {
                scope: scope,
                properties: props
            }
        })

        expect(wrapper.text()).toBe('User Info: user 1, email@example.com')
    })

})