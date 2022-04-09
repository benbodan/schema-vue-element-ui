import { mount } from '@vue/test-utils'
import install from '../install'
import EventBus from '@/Providers/EventBus'

import Button from '@/components/Button'
import EventSchema from '@/Schema/Event'

import { wrap } from 'lodash'

describe('Button Component',() => {
    
    it('it dispatch events on click', async () => {
        const props = {
            on_click: [
                new EventSchema('first', 'first'),
                new EventSchema('second', 'second value'),
            ]
        }

        const wrappper = mount(Button, {
            propsData: {
                properties: props
            }
        })

        const button = wrappper.find('button')
        button.trigger('click')

        await wrappper.vm.$nextTick();

        expect(wrappper.emitted().first).toBeTruthy()
        expect(wrappper.emitted().first.toString()).toBe('first')

        expect(wrappper.emitted().second).toBeTruthy()
        expect(wrappper.emitted().second.toString()).toBe('second value')
    })

})