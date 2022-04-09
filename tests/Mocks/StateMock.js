import Vuex from 'vuex'
import State from '@/Providers/State'
var _ = require('lodash');

export default function stateMock(state) {

    const actions = {
        set({ commit }, payload) { 
            commit('set', payload)
        }
    }

    const getters = {
        data(state) {
            return state
        }
    }

    const mutations = {
        set(state, payload){
            _.set(state, payload.key, payload.value)
        }
    }

    const store = new Vuex.Store({
        modules: {
            schema: {
                namespaced: true,
                state,
                actions,
                getters,
                mutations
            }
        }
    })

    return new State(store, 'schema')
}