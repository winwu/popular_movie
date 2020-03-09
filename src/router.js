import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

// via: https://github.com/vuejs/vue-router/blob/dev/examples/scroll-behavior/app.js
// scrollBehavior:
// - only available in html5 history mode
// - defaults to no scroll behavior
// - return false to prevent scroll
// const scrollBehavior = function (to, from, savedPosition) {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			resolve({ x: 0, y: 0 })
// 		}, 300)
// 	})
// }

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	linkActiveClass: 'active',
	// scrollBehavior,
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
			meta: { scrollToTop: true }
		},
		{
			path: '/discover',
			name: 'discover',
			component: () => import(/* webpackChunkName: "discover" */ './views/Discover/Discover.vue'),
			meta: { scrollToTop: true }
		},
		{
			path: '/about',
			name: 'about',
			component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
		},
		{
			path: '/movie/detail/:movieId/:currentTab?',
			name: 'movie_detail',
			component: () => import(/* webpackChunkName: "detail" */ './views/Detail.vue')
		}
  ]
})
