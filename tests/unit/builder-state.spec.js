import { mount } from '@vue/test-utils'
import install from '../install'
import stateMock from '../Mocks/StateMock'

import Builder from '@/components/Builder';
import Text from '@/components/Text';

import TextSchema from '@/Schema/Text';
import CardSchema from '@/Schema/Card';
import StateRepository from '@/Schema/Repositories/StateRepository';

import Card from '@/Schema/Card';
import { wrap } from 'lodash';



describe('Builder Using State', () => {

    it("it renders its' children components foreach item in State", () => {

        const props = {
            name: 'users',
            repository: new StateRepository({
                name: 'users'
            }),
            children: [
                new CardSchema({
                    children: [
                        new TextSchema({
                            value: '{name}'
                        })
                    ]
                })
            ]
        }

        const $schemaStore = new stateMock({
            users: [
                {
                    name: 'User 1'
                },
                {
                    name: 'User 2'
                },
            ]
        })

        const wrapper = mount(Builder, {
            mocks: {
                $schemaStore
            },
            propsData: {
                properties: props
            }
        })

        expect(wrapper.findAllComponents(Text).length).toBe(2)
        expect(wrapper.findComponent(Text).text()).toBe('User 1')
    })

    it("it renders its children components again when new item is added in the state", async () => {
        const props = {
            name: 'users',
            repository: new StateRepository({
                name: 'users.items'
            }),
            children: [
                new CardSchema({
                    children: [
                        new TextSchema({
                            value: '{name}'
                        })
                    ]
                })
            ]
        }

        let users = [
            {
                name: 'User 1'
            },
            {
                name: 'User 2'
            },
        ]

        const $schemaStore = new stateMock({
            users: {
                items: users
            }
        })

        const wrapper = mount(Builder, {
            mocks: {
                $schemaStore
            },
            propsData: {
                properties: props
            }
        })


        // Add New User
        users.push({ name: 'User 3' })
        wrapper.vm.$schemaStore.set('users.items', users)
        await wrapper.vm.$nextTick()

        expect(wrapper.findAllComponents(Text).length).toBe(3)
    })


    it("it renders its children components again when an item is removed from the state", async () => {
        const props = {
            name: 'users',
            repository: new StateRepository({
                name: 'users.items'
            }),
            children: [
                new CardSchema({
                    children: [
                        new TextSchema({
                            value: '{name}'
                        })
                    ]
                })
            ]
        }

        let users = [
            {
                name: 'User 1'
            },
            {
                name: 'User 2'
            },
            {
                name: 'User 3'
            },
        ]

        const $schemaStore = new stateMock({
            users: {
                items: users
            }
        })

        const wrapper = mount(Builder, {
            mocks: {
                $schemaStore
            },
            propsData: {
                properties: props
            }
        })


        // Add New User
        users.pop()
        wrapper.vm.$schemaStore.set('users.items', users)
        await wrapper.vm.$nextTick()

        expect(wrapper.findAllComponents(Text).length).toBe(2)
    })
})