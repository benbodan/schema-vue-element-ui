var _ = require('lodash');

const store = {
    namespaced: true,
    state: {
        data: {
            user: {
                email: 'test'
            }
        },
    },
    actions: {
        set({ commit }, payload) {
            commit("set", payload);
        },
    },
    mutations: {
        increment(state) {
            state.count++
        },
        set(state, payload) {
            _.set(state.data, payload.key, payload.value)
        }
    },
    getters: {
        data: (state) => {
            return state.data
        },
    }
}


export default store;