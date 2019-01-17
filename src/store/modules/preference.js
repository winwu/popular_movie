// initial state
const state = {
    checkedLang: null
}

const getters = {}

const actions = {
    getInitLangAction ({ commit }) {
        commit('setLang', 'zh-TW');
    },
    setLangAction ({ commit }, newLang) {
        commit('setLang', newLang);
    }
}

const mutations = {
    setLang (state, newLang) {
        state.checkedLang = newLang;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}