import { mount } from '@vue/test-utils'
import install from '../install'
import Form from '@/components/Form'
import Input from '@/components/Input'
import stateMock from '../Mocks/StateMock'
import InputSchema from '@/Schema/Input'
import JsonRepository from '@/Schema/Repositories/JsonRepository'

describe('Form Component Using Json', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    const user_form = {
        name: 'User Name',
        email: 'email@example.com'
    }

    it("it gets initial data from json repository and updates the form's state", async () => {
        // Component Properties
        const props = {
            name: 'form',
            repository: new JsonRepository({
                response: user_form
            }),
            children: [
                new InputSchema({
                    name: 'form.body.name'
                }),
                new InputSchema({
                    name: 'form.body.email'
                }),
            ]
        }

        // Mock State
        const $schemaStore = new stateMock({
            user_form
        });

        // Mount Component
        let wrapper = mount(Form, {
            mocks: {
                $schemaStore
            },
            propsData: {
                properties: props
            }
        })

        // Check State
        let state = wrapper.vm.$schemaStore.get('form.body')
        expect(state).toBe(user_form)

        // Check Children Display Latest Values
        const name = wrapper.find('input[name="form.body.name"]')
        expect(name.element.value).toBe(user_form.name)

        const email = wrapper.find('input[name="form.body.email"]')
        expect(email.element.value).toBe(user_form.email)

        wrapper.destroy()
    })

    it("on delete event it deletes the json & updates it's state", async () => {
        // Component Properties
        const props = {
            name: 'form',
            repository: new JsonRepository({
                response: user_form
            }),
            children: [
                new InputSchema({
                    name: 'form.body.name'
                }),
                new InputSchema({
                    name: 'form.body.email'
                }),
            ]
        }

        // Mock State
        const $schemaStore = new stateMock({
            user_form
        });

        // Mount Component
        let wrapper = mount(Form, {
            mocks: {
                $schemaStore
            },
            propsData: {
                properties: props
            }
        })

        // Call Delete Event
        wrapper.vm.$schemaEvents.$emit('form.delete', {})
        await wrapper.vm.$nextTick()

        // Check Repository State
        const state = wrapper.vm.$schemaStore.get('form.body')
        expect(state).toStrictEqual({})

        // Check Children Display Latest Values
        name = wrapper.find('input[name="form.body.name"]')
        expect(name.element.value).toBe('')

        const email = wrapper.find('input[name="form.body.email"]')
        expect(email.element.value).toBe('')

        wrapper.destroy()
    })


    it("on update event it updates the json", async () => {
        // Component Properties
        const props = {
            name: 'form',
            repository: new JsonRepository({
                response: user_form
            }),
            children: [
                new InputSchema({
                    name: 'form.body.name'
                }),
                new InputSchema({
                    name: 'form.body.email'
                }),
            ]
        }

        // Mock State
        const $schemaStore = new stateMock({
            user_form
        });

        // Mount Component
        let wrapper = mount(Form, {
            mocks: {
                $schemaStore
            },
            propsData: {
                properties: props
            }
        })

        // Change Form Input Value
        const updated_name = user_form.name + ' Updated'
        let name = wrapper.find('input[name="form.body.name"]')
        name.element.value = updated_name
        name.trigger('input')

        // Call Update Event
        wrapper.vm.$schemaEvents.$emit('form.update', {})
        await wrapper.vm.$nextTick()

        // Change Input Again
        name.element.value = user_form.name
        name.trigger('input')

        // Check Repository State
        const state = wrapper.vm.$schemaStore.get('form.body')
        expect(state.name).toStrictEqual(user_form.name)

        // Call Show Again to refersh form's state with the latest saved repo state
        wrapper.vm.$schemaEvents.$emit('form.show')
        await wrapper.vm.$nextTick()

        // Check Name is equal to latest repository update
        name = wrapper.find('input[name="form.body.name"]')
        expect(name.element.value).toBe(updated_name)

        const email = wrapper.find('input[name="form.body.email"]')
        expect(email.element.value).toBe(user_form.email)

        wrapper.destroy()
    })
})