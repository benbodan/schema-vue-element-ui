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

describe('Form Component In Builder', () => {
    it('it displays a form for each user & form updates form state', async () => {

        const builder_response = [
            {
                id: 1,
                name: 'User 1'
            },
            {
                id: 2,
                name: 'User 2'
            },
        ]

        const UserCard = new CardSchema({
            children: [
                new FormSchema({
                    name: 'user_{id}',
                    fetch: false,
                    repository: new RestRepository({
                        update: 'http://example/api/user/{id}'
                    }),
                    children: [
                        new InputSchema({
                            name: 'user_{id}.body.name'
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
                                        response: builder_response
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
    })
})