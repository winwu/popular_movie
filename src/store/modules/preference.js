// initial state
const state = {
    langList: [
        {
            key: 'en-US',
            text: 'English'
        },
        {
            key: 'zh-TW',
            text: '繁體中文'
        }
    ],
    checkedLang: null
}

const getters = {
    checkedLangObj: (state) => {
        return (state.langList.find(opt => opt.key === state.checkedLang) ? state.langList.find(opt => opt.key === state.checkedLang) : null)
    }
}

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