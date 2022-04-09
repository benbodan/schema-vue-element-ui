import { mount } from '@vue/test-utils'
import install from '../install'

import Builder from '@/components/Builder'
import Card from '@/components/Card'
import Text from '@/components/Text'

import CardSchema from '@/Schema/Card'
import TextSchema from '@/Schema/Text'

import stateMock from '../Mocks/StateMock'
import { wrap } from 'lodash'

describe('Builder Component', () => {
    it('it renders children components for each item in data array', () => {
        const props = {
            name: 'users',
            children: [
                new CardSchema({
                    children: [
                        new TextSchema({value: '{name}'})
                    ]
                })
            ],
            data: [
                {
                    name: 'User 1'
                },
                {
                    name: 'User 2'
                },
            ],
        }

        const wrapper = mount(Builder, {
            propsData: {
                properties: props
            }
        })

        expect(wrapper.findAllComponents(Text).length).toBe(2)
        expect(wrapper.findComponent(Text).text()).toBe('User 1')
    })


    it('it updates the state with the items form tha data property', () => {
        const props = {
            name: 'users',
            children: [
                new CardSchema()
            ],
            data: [
                {
                    name: 'User 1'
                },
                {
                    name: 'User 2'
                },
            ],
        }

        const $schemaStore = new stateMock();

        const wrapper = mount(Builder, {
            mocks: {
                $schemaStore
            },
            propsData: {
                properties: props
            }
        })

        const data = wrapper.vm.$schemaStore.get(`${props.name}.items`);
        expect(data).toBe(props.data);
    })

})