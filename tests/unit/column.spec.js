import { mount } from "@vue/test-utils"
import install from '../install'

import Page from '@/components/Page'
import Row from '@/components/Row'
import Column from '@/components/Column'

import RowSchema from '@/Schema/Row'
import ColumnSchema from '@/Schema/Column'

describe('Column Component', () => {
    const props = {
        offset: 1,
        pull: 2,
        push: 3,
        span: 12,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 5
    }

    const wrapper = mount(Column, {
        propsData: {
            properties: props
        }
    })

    it('Can be rendered in a page component', () => {
        let props = {
            body: [
                (new RowSchema({
                    columns: [
                        (new ColumnSchema()).json(),
                        (new ColumnSchema()).json()
                    ]
                })).json()
            ]
        }

        const wrapper = mount(Page, {
            propsData: {
                properties: props
            }
        })

        expect(wrapper.findAllComponents(Column).length).toBe(2)
    })

    it('Has Responsive Column Size', () => {
        expect(wrapper.classes()).toContain(`el-col-xs-${props.xs}`)
        expect(wrapper.classes()).toContain(`el-col-sm-${props.sm}`)
        expect(wrapper.classes()).toContain(`el-col-md-${props.md}`)
        expect(wrapper.classes()).toContain(`el-col-lg-${props.lg}`)
        expect(wrapper.classes()).toContain(`el-col-xl-${props.xl}`)
    })

    it('Supports offset , pull, push and span', () => {
        expect(wrapper.classes()).toContain(`el-col-offset-${props.offset}`)
        expect(wrapper.classes()).toContain(`el-col-push-${props.push}`)
        expect(wrapper.classes()).toContain(`el-col-pull-${props.pull}`)
        expect(wrapper.classes()).toContain(`el-col-${props.span}`)
    })
});