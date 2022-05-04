import { mount } from '@vue/test-utils'
import install from '../install'
import stateMock from '../Mocks/StateMock'

import Builder from '@/components/Builder';

import TextSchema from '@/Schema/Text';
import CardSchema from '@/Schema/Card';
import JsonRepository from '@/Schema/Repositories/JsonRepository';
import Text from '@/components/Text';
import Card from '@/components/Card';

describe('Builder Using JsonRepository', () => {
    it('it updates the state with the items form tha data property', () => {

        const users = [
            {
                name: 'User 1'
            },
            {
                name: 'User 2'
            },
        ]

        const props = {
            name: 'users',
            repository: new JsonRepository({
                response: users,
            }),
            children: [
                new CardSchema()
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
        expect(data).toStrictEqual(users);
    })

    it('it supports different json response structures', () => {

        const users = [
            {
                name: 'User 1'
            },
            {
                name: 'User 2'
            },
        ]

        const props = {
            name: 'users',
            key: 'data.items',
            repository: new JsonRepository({
                response: {
                    data: {
                        items: users
                    }
                },
            }),
            children: [
                new CardSchema({
                    children: [
                        new TextSchema({
                            value: '{name}'
                        })
                    ]
                })
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
        expect(data).toStrictEqual(users);
    })

    it('it renders children components for each item in json response', () => {
        
        const users = [
            {
                name: 'User 1'
            },
            {
                name: 'User 2'
            },
        ]

        const props = {
            name: 'users',
            repository: new JsonRepository({
                response: users
            }),
            children: [
                new CardSchema({
                    children: [
                        new TextSchema({ value: '{name}' })
                    ]
                })
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
})