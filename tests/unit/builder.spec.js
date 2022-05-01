import { mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'

import install from '../install'
import axios from 'axios'

import Builder from '@/components/Builder'
import Card from '@/components/Card'
import Text from '@/components/Text'

import CardSchema from '@/Schema/Card'
import TextSchema from '@/Schema/Text'

import stateMock from '../Mocks/StateMock'
import RestRepository from '@/Schema/Repositories/RestRepository'
import JsonRepository from '@/Schema/Repositories/JsonRepository'

describe('Builder Component', () => {

    it('it listen to events and fetch items', async () => {
        const props = {
            name: 'users',
            repository: new RestRepository({
                get: 'https://example.com/users'
            }),
            children: []
        }

        const response = { data: [] }
        jest.spyOn(axios, 'get').mockResolvedValue(response)

        const $schemaStore = new stateMock()

        const wrapper = mount(Builder, {
            mocks: {
                $schemaStore
            },
            propsData: {
                properties: props
            }
        })

        expect(axios.get).toHaveBeenCalledWith('https://example.com/users')
        expect(axios.get).toBeCalledTimes(1)

        wrapper.vm.$schemaStore.set('users.query.name', 'Mr.');
        await wrapper.vm.$nextTick()

        // Call Get Method when new event have been published
        wrapper.vm.$schemaEvents.$emit('users.get', {})
        expect(axios.get).toHaveBeenCalledWith('https://example.com/users?name=Mr.')

        expect(axios.get).toBeCalledTimes(2)
    })

    it('it fetch items using rest and query parameters', async () => {
        const props = {
            name: 'users',
            repository: new RestRepository({
                get: 'https://example.com/users'
            }),
            children: [
                new CardSchema({
                    children: [
                        new TextSchema({ value: '{name}' })
                    ]
                })
            ]
        }

        const response = { data: [] }

        jest.spyOn(axios, 'get').mockResolvedValue(response)
        let $schemaStore = new stateMock({
            users: {
                query: {
                    name: 'Mr.',
                    email: 'gmail'
                }
            }
        });

        const wrapper = mount(Builder, {
            mocks: {
                $schemaStore
            },
            propsData: {
                properties: props
            }
        })

        expect(axios.get).toHaveBeenCalledWith('https://example.com/users?name=Mr.&email=gmail')
    })

    it('it can fetch items using Rest repository and updates its state', async () => {

        const props = {
            name: 'users',
            repository: new RestRepository({
                get: 'https://example.com/users'
            }),
            children: [
                new CardSchema({
                    children: [
                        new TextSchema({ value: '{name}' })
                    ]
                })
            ]
        }

        const response =
        {
            data: [
                { id: 1, name: 'User 1' },
                { id: 2, name: 'User 2' }
            ]
        }

        jest.spyOn(axios, 'get').mockResolvedValue(response)

        let $schemaStore = new stateMock();

        const wrapper = mount(Builder, {
            mocks: {
                $schemaStore
            },
            propsData: {
                properties: props
            }
        })

        // It triggers an axios get request to the provided url
        expect(axios.get).toHaveBeenCalledWith('https://example.com/users')

        // Wait until the dom updates
        await flushPromises()

        // It renders children for each item received
        expect(wrapper.findAllComponents(Text).length).toBe(2);

        // It sets the received items in state
        const data = wrapper.vm.$schemaStore.get(`${props.name}.items`);
        expect(data).toBe(response.data);
    })
})