import { mount } from '@vue/test-utils'
import install from '../install'
import Form from '@/components/Form'
import Input from '@/components/Input'
import stateMock from '../Mocks/StateMock'
import InputSchema from '@/Schema/Input'
import JsonRepository from '@/Schema/Repositories/JsonRepository'
import RestRepository from '@/repositories/RestRepository'

describe('Form Component Using Json', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("it gets initial data from schema and updates the form's state", async () => {

        const user_form = {
            name: 'User Name',
            email: 'email@example.com'
        }

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
        expect(state).toStrictEqual(user_form)

        // Check Children Display Latest Values
        const name = wrapper.find('input[name="form.body.name"]')
        expect(name.element.value).toBe(user_form.name)

        const email = wrapper.find('input[name="form.body.email"]')
        expect(email.element.value).toBe(user_form.email)

        wrapper.destroy()
    })

    it("it gets initial data from json repository and updates the form's state", async () => {

        const user_form = {
            name: 'User Name',
            email: 'email@example.com'
        }

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
        expect(state).toStrictEqual(user_form)

        // Check Children Display Latest Values
        const name = wrapper.find('input[name="form.body.name"]')
        expect(name.element.value).toBe(user_form.name)

        const email = wrapper.find('input[name="form.body.email"]')
        expect(email.element.value).toBe(user_form.email)

        wrapper.destroy()
    })

    it("on delete event it deletes the json & updates it's state", async () => {

        const user_form = {
            name: 'User Name',
            email: 'email@example.com'
        }

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
        const user_form = {
            name: 'User Name',
            email: 'email@example.com'
        }

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
        wrapper.vm.$schemaEvents.$emit('form.put', {})
        await wrapper.vm.$nextTick()

        // Change Input Again
        name.element.value = user_form.name
        name.trigger('input')

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

    it('it repalces variables in properties with data from the scope', () => {
        const user_form = {
            name: 'User Name',
            email: 'email@example.com'
        }

        const scope = {
            id: 2,
            name: 'name'
        }

        const props = {
            name: 'form_{id}',
            fetch: false,
            repository: new RestRepository({
                show: 'http://example.com/user/{id}'
            }),
            children: [
                new InputSchema({
                    name: 'form_{id}.body.name'
                }),
                new InputSchema({
                    name: 'form_{id}.body.email'
                }),
            ]
        }

        const wrapper = mount(Form, {
            propsData: {
                scope: scope,
                properties: props
            }
        })

        expect(wrapper.vm.props.name).toBe('form_2')
        expect(wrapper.vm.props.repository.options.show).toBe('http://example.com/user/2')
        
        // Form updates its state using scope property
        const state = wrapper.vm.$schemaStore.get('form_2.body')
        expect(state).toBe(scope)

        // Check Name is equal to latest repository update
        name = wrapper.find('input[name="form_2.body.name"]')
        expect(name.element.value).toBe(scope.name)
    })
})