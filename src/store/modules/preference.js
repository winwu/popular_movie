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
        if (window.localStorage && window.localStorage.getItem('lang')) {
            commit('setLang', window.localStorage.getItem('lang'));
        } else {
            switch (navigator.language ) {
                case 'zh-TW':
                    commit('setLang', 'zh-TW');
                    break;
                default:
                    commit('setLang', 'en-US');
            }
        }
    },
    setLangAction ({ commit }, newLang) {
        commit('setLang', newLang);
    }
}

const mutations = {
    setLang (state, newLang) {
        window.localStorage.setItem('lang', newLang);
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