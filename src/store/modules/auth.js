// auth module

// initial state
const state = {
    user: {},
    isLogin: false
}

const getters = {}

const actions = {
    checkLogin ({ commit }) {
        if (window.localStorage.getItem('user') && window.localStorage.getItem('user') !== '') {
            commit('setAuth', JSON.parse(localStorage.getItem('user')));
        }
    },
    login ({ commit }, payload ) {
        commit('setAuth', payload)
    },
    logout ({ commit }) {
        commit('logout');
    }
}

const mutations = {
    setAuth (state, payload) {
        state.user = payload;
        state.isLogin = true;
        window.localStorage.setItem('user', JSON.stringify(state.user));
    },
    logout( state ) {
        state.user = {};
        state.isLogin = false;
        window.localStorage.setItem('user', null);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}