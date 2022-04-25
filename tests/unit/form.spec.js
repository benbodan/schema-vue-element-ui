import { mount } from '@vue/test-utils'
import axios from 'axios'
import install from '../install'
import Form from '@/components/Form'
import stateMock from '../Mocks/StateMock'
import RestRepository from '@/Schema/Repositories/RestRepository'
import flushPromises from 'flush-promises'

describe('Form Component', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('it listens for show events , fetch data and updates the state', async () => {
        // Mock Axios
        const response = {
            name: 'User Name',
            email: 'email@example.com'
        }

        jest.spyOn(axios, 'get').mockResolvedValue(response)

        // Mount Component
        const props = {
            name: 'form',
            repository: new RestRepository({ show: 'http://example.com/user/1' })
        }
        let wrapper = mount(Form, {
            propsData: {
                properties: props
            }
        })

        // Fetch Initial Data
        expect(axios.get).toBeCalledWith('http://example.com/user/1')
        expect(axios.get).toHaveBeenCalledTimes(1)

        wrapper.vm.$schemaEvents.$emit('form.show', {})

        await wrapper.vm.$nextTick()

        expect(axios.get).toHaveBeenCalledTimes(2)

        wrapper.destroy()
    })

    it('it listens for put/patch events , and sends a patch request using rest repository', async () => {
        // Mock Axios
        const response = {
            name: 'User Name',
            email: 'email@example.com'
        }

        jest.spyOn(axios, 'put').mockResolvedValue(response)
        jest.spyOn(axios, 'patch').mockResolvedValue(response)

        // Mount Component
        const props = {
            name: 'form',
            repository: new RestRepository({ update: 'http://example.com/user/1' })
        }
        
        // Set Form Data In State
        const $schemaStore = new stateMock({
            form: {
                body: response
            }
        })

        let wrapper = mount(Form, {
            mocks: {
                $schemaStore
            },
            propsData: {
                properties: props
            }
        })

        // Publish Put Event on Form Topic
        wrapper.vm.$schemaEvents.$emit('form.put', '')

        expect(axios.put).toHaveBeenCalledWith('http://example.com/user/1', response)
        expect(axios.put).toHaveBeenCalledTimes(1)

        // Publish Patch Event on Form Topic
        wrapper.vm.$schemaEvents.$emit('form.patch', '')

        expect(axios.patch).toHaveBeenCalledWith('http://example.com/user/1', response)
        expect(axios.patch).toHaveBeenCalledTimes(1)

        wrapper.destroy()
    })

    it('it listens for post events , and sends a post request using rest repository', async () => {
        // Mock Axios
        const response = {
            name: 'User Name',
            email: 'email@example.com'
        }

        jest.spyOn(axios, 'post').mockResolvedValue(response)

        // Mount Component
        const props = {
            name: 'form',
            repository: new RestRepository({ create: 'http://example.com/user' })
        }

        // Set Form Data In State
        const $schemaStore = new stateMock({
            form: {
                body: response
            }
        })

        const wrapper = mount(Form, {
            mocks: {
                $schemaStore
            },
            propsData: {
                properties: props
            }
        })

        // Publish Put Event on Form Topic
        wrapper.vm.$schemaEvents.$emit('form.post', '')

        expect(axios.post).toHaveBeenCalledWith('http://example.com/user', response)
        expect(axios.post).toHaveBeenCalledTimes(1)
        wrapper.destroy()
    })

    it('it listens for delete events , and sends a delete request using rest repository', async () => {
        // Mock Axios
        const response = {
            id: 1,
        }

        jest.spyOn(axios, 'delete').mockResolvedValue(response)

        // Mount Component
        const props = {
            name: 'form',
            repository: new RestRepository({ delete: 'http://example.com/user/1' })
        }

        // Set Form Data In State
        const $schemaStore = new stateMock({
            form: {
                body: response
            }
        })

        const wrapper = mount(Form, {
            mocks: {
                $schemaStore
            },
            propsData: {
                properties: props
            }
        })

        // Publish Put Event on Form Topic
        wrapper.vm.$schemaEvents.$emit('form.delete', '')

        expect(axios.delete).toHaveBeenCalledWith('http://example.com/user/1', response)
        expect(axios.delete).toHaveBeenCalledTimes(1)
        wrapper.destroy()
    })


    it('it gets initial data using rest repository & updates state', async () => {

        // Mock Axios
        const response = {
            name: 'User Name',
            email: 'email@example.com'
        }
        jest.spyOn(axios, 'get').mockResolvedValue(response)

        // Mount Component
        const props = {
            name: 'form',
            repository: new RestRepository({ show: 'http://example.com/user/1' })
        }
        const $schemaStore = new stateMock()
        const wrapper = mount(Form, {
            propsData: {
                properties: props
            }
        })

        // Fetch Data Using Rest
        expect(axios.get).toBeCalledWith('http://example.com/user/1')
        expect(axios.get).toHaveBeenCalledTimes(1)

        await flushPromises();

        // Updates its' state
        const body = wrapper.vm.$schemaStore.get('form.body')
        wrapper.destroy()
    })

})