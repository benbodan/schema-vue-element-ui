import { mount } from '@vue/test-utils'
import install from '../../install'

// Components
import Form from '@/components/Form'
import Input from '@/components/Input'
import Page from '@/components/Page'
import Card from '@/components/Card'

// Schema
import RowSchema from '@/Schema/Row';
import ColumnSchema from '@/Schema/Column';
import BuilderSchema from '@/Schema/Builder'
import CardSchema from '@/Schema/Card';
import FormSchema from '@/Schema/Form';
import InputSchema from '@/Schema/Input'
import JsonRepository from '@/Schema/Repositories/JsonRepository'

import stateMock from '../../Mocks/StateMock'
import Row from '@/Schema/Input'
import Column from '@/Schema/Column'
import RestRepository from '@/repositories/RestRepository'
import axios from 'axios';

describe('Form Component In Builder', () => {
    it('it displays a form for each user & form updates form state', async () => {

        const response = {
            'message': 'Updated Successfully'
        }

        const users = [
            {
                id: 1,
                name: 'User 1',
                email: 'email1@example.com'
            },
            {
                id: 2,
                name: 'User 2',
                email: 'email2@example.com'
            },
        ]

        const UserCard = new CardSchema({
            children: [
                new FormSchema({
                    name: 'user_{id}',
                    fetch: false,
                    repository: new RestRepository({
                        put: 'http://example/api/user/{id}'
                    }),
                    children: [
                        new InputSchema({
                            name: 'user_{id}.body.name'
                        }),
                        new InputSchema({
                            name: 'user_{id}.body.email'
                        })
                    ]
                })
            ]
        })

        // Components
        const props = {
            body: [
                new RowSchema({
                    columns: [
                        new ColumnSchema({
                            children: [
                                new BuilderSchema({
                                    name: 'users',
                                    repository: new JsonRepository({
                                        response: users
                                    }),
                                    children: [
                                        UserCard
                                    ]
                                })
                            ]
                        })
                    ]
                })
            ]
        };

        // Compoennts State
        const $schemaStore = new stateMock({});

        // Mount Main Component
        const wrapper = mount(Page, {
            mocks: { $schemaStore },
            propsData: {
                properties: props
            }
        })

        // One form for each user
        expect(wrapper.findAllComponents(Form).length).toBe(2)

        const forms = wrapper.findAllComponents(Form)

        jest.spyOn(axios, 'get').mockResolvedValue(response)

        for (let i = 0; i < users.length; i++) {
            // Forms has correct name
            let name = `user_${users[i].id}`
            expect(forms.at(i).vm.props.name).toBe(name)

            // Form Has updated its's scope values in state
            let state = wrapper.vm.$schemaStore.get(`${name}.body`)
            expect(state.name).toBe(users[i].name)
            expect(state.email).toBe(users[i].email)

            // Check Name Input is updated with the values from the state
            let name_input = wrapper.find(`input[name="${name}.body.name"]`)
            expect(name_input.element.value).toBe(users[i].name)

            // Check Email Input is updated with the values from the state
            let email_input = wrapper.find(`input[name="${name}.body.email"]`)
            expect(email_input.element.value).toBe(users[i].email)
        }
    })
})