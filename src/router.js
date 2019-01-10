import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	linkActiveClass: 'active',
  	routes: [
    	{
			path: '/',
			name: 'home',
			component: Home
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
