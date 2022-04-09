import { mount } from '@vue/test-utils'
import install from '../install'

import Builder from '@/components/Builder'
import Card from '@/components/Card'
import CardSchema from '@/Schema/Card'
import stateMock from '../Mocks/StateMock'
import { wrap } from 'lodash'

describe('Builder Component', () => {
    it('it renders children components for each item in data array', () => {
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

        const wrappper = mount(Builder, {
            propsData: {
                properties: props
            }
        })

        expect(wrappper.findAllComponents(Card).length).toBe(2)
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

        const wrappper = mount(Builder, {
            mocks: {
                $schemaStore
            },
            propsData: {
                properties: props
            }
        })

        const data = wrappper.vm.$schemaStore.get(`${props.name}.items`);
        expect(data).toBe(props.data);

    })

})