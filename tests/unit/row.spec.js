import { mount } from "@vue/test-utils"
import install from '../install'
import Row from '@/components/Row'
import Column from '@/components/Column';

import ColumnSchema from '@/Schema/Column'

describe('it renders columns', () => {
    const props = {
        columns: [
            new ColumnSchema(),
            new ColumnSchema(),
        ]
    }

    const wrapper = mount(Row, {
        propsData: {
            properties: props
        }
    })

    expect(wrapper.findAllComponents(Column)).toHaveLength(2)
})

describe('Row Component', () => {

    it('it supports gutter property', () => {

        const wrapper = mount(Row, {
            propsData: {
                properties: {
                    gutter: 20
                }
            }
        })

        expect(wrapper.attributes()).toHaveProperty('style');
        expect(wrapper.vm.props.gutter).toBe(20)
    })

    it('it supports flex layout mode', () => {

        const wrapper = mount(Row, {
            propsData: {
                properties: {
                    type: 'flex'
                }
            }
        })

        expect(wrapper.classes()).toContain('el-row--flex')
    })

    it('it supports horizontal alignment', () => {

        var values = [
            // 'start', default
            'end',
            'center',
            'space-around',
            'space-beetween'
        ];

        values.forEach(val => {
            let wrapper = mount(Row, {
                propsData: {
                    properties: {
                        type: 'flex',
                        justify: val
                    }
                }
            })
            expect(wrapper.classes()).toContain(`is-justify-${val}`)
        })
    })

    it('it supports vertical alignment', () => {

        var values = [
            'top',
            'middle',
            'bottom',
        ];

        values.forEach(val => {
            let wrapper = mount(Row, {
                propsData: {
                    properties: {
                        type: 'flex',
                        align: val
                    }
                }
            })
            expect(wrapper.classes()).toContain(`is-align-${val}`)
        })
    })

});