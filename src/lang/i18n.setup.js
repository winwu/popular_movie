import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from '../store'
import enUS from './en-US.json'
import zhTW from './zh-TW.json'


Vue.use(VueI18n)

store.dispatch('preference/getInitLangAction')

const i18n = new VueI18n({
	locale: store.state.preference.checkedLang,
	messages: {
		'en-US': enUS,
		'zh-TW': zhTW
	}
})

export default i18n;