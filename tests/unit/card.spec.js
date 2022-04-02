import { mount, shallowMount } from '@vue/test-utils'
import install from '../install';

import Card from '@/components/Card'
import Row from '@/components/Row'
import RowSchema from '@/Schema/Row'

describe('Card Components', () => {

    it('it renders children components', () => {

        const props = {
            children: [
                new RowSchema()
            ]
        }

        const wrapper = mount(Card, {
            propsData: {
                properties: props
            }
        })

        expect(wrapper.findAllComponents(Row).length).toBe(1)
    })

    it('it renders header components', () => {

        const props = {
            header: [
                new RowSchema()
            ]
        }

        const wrapper = mount(Card, {
            propsData: {
                properties: props
            }
        })

        expect(wrapper.findAllComponents(Row).length).toBe(1)
    })

    it('it supports shadow propery', () => {
        const values = [
            'always',
            'hover',
            'never',
        ]

        values.forEach(val => {

            const warapper = mount(Card, {
                propsData: {
                    properties: {
                        shadow: val
                    }
                }
            })

            expect(warapper.classes()).toContain(`is-${val}-shadow`)
        })
    })
})