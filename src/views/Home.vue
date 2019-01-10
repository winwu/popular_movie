<template>
  	<div id="home" class="container">
    	<!-- <movie-item></movie-item> -->

  	</div>
</template>

<script>
// import MovieItem from './components/MovieItem.vue'
// import HelloWorld from '@/components/HelloWorld.vue'
export default {
	name: 'home',
	components: {
		// MovieItem
	},
	data() {
    	return {
      		populars: []
    	}
	},
	mounted() {
		this.fetchPopular();
	},
	methods: {
		fetchPopular() {
			this.$http
				.get(`${ this.$conf.API_DOMAIN }movie/popular?api_key=${ this.$conf.API_KEY }&language=${ this.$conf.API_LANG }&page=1`)
				.then(response => (this.populars = response))
		}
	}
}
</script>


<style lang="scss" scoped>
#home {
}
</style>