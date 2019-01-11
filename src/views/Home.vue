<template>
  	<div id="home" class="container">
		  <div v-if="populars" class="row no-gutters">
			<div v-for="movie in populars" :key="movie.id" class="col-12 col-md-6 col-lg-3">
				<movie-card :movie="movie"></movie-card>
			</div>
		  </div>
  	</div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'
export default {
	name: 'home',
	components: {
		MovieCard
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
				.then(res => {
					console.log('res', res);
					if (res.data && res.data.results) {
						this.populars = res.data.results;
					}
				})
		}
	}
}
</script>
<style lang="scss" scoped>
</style>