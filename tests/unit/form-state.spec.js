import { mount } from '@vue/test-utils'
import install from '../install'
import Form from '@/components/Form'
import Input from '@/components/Input'
import stateMock from '../Mocks/StateMock'
import InputSchema from '@/Schema/Input'
import StateRepository from '@/Schema/Repositories/StateRepository'

describe('Form Component Using State', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    const user_form = {
        name: 'User Name',
        email: 'email@example.com'
    }

    it("it copies data from the state and updates the form's state", async () => {
        // Component Properties
        const props = {
            name: 'form',
            repository: new StateRepository({
                name: 'user_form'
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

    it("on update event it updates StateRepository's state using form's state", async () => {
        // Component Properties
        const props = {
            name: 'form',
            repository: new StateRepository({
                name: 'user_form'
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

        // Publish Update Event
        wrapper.vm.$schemaEvents.$emit('form.update', {})
        await wrapper.vm.$nextTick()

        // Check Repository State
        const state = wrapper.vm.$schemaStore.get('user_form')
        expect(state.name).toBe(updated_name)
        expect(state.email).toBe(user_form.email)

        // Check Children Display Latest Values
        name = wrapper.find('input[name="form.body.name"]')
        expect(name.element.value).toBe(state.name)

        const email = wrapper.find('input[name="form.body.email"]')
        expect(email.element.value).toBe(state.email)

        wrapper.destroy()
    })

    it("it supports diferent response structures using key property", async () => {

        const user_form = {
            name: 'User Name',
            email: 'email@example.com'
        }

        // Component Properties
        const props = {
            name: 'form',
            key: 'form.entries',
            repository: new StateRepository({
                name: 'user_form'
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
            user_form: {
                form: {
                    entries: user_form
                }
            }
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

        // Check Repository State
        const state = wrapper.vm.$schemaStore.get('form.body')
        expect(state).toBe(user_form)

        // Check Children Display Latest Values
        name = wrapper.find('input[name="form.body.name"]')
        expect(name.element.value).toBe(user_form.name)

        const email = wrapper.find('input[name="form.body.email"]')
        expect(email.element.value).toBe(user_form.email)

        wrapper.destroy()
    })
})