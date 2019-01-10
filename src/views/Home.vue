<template>
  	<div id="home" class="container">
		  <div v-if="populars" class="row no-gutters">
			<div v-for="movie in populars" :key="movie.id" class="col-12 col-md-6 col-lg-4">
				<div class="movie-card" :style="{ backgroundImage: 'url(' + 'https://image.tmdb.org/t/p/w500/' + movie.poster_path + ')' }">
					<div class="movie-pos-btm">
						<h2 class="movie-title">{{ movie.title }}</h2>
						<div data="vote_average">{{ movie.vote_average }}</div>
					</div>

				</div>
			</div>
		  </div>
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
.movie-card {
	min-height: 500px;
	background-size: cover;
    background-position: center center;
	color: #fff;
	padding: 20px;
	position: relative;
	&:before {
		content: ' ';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		background: -moz-linear-gradient(top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%);
		background: -webkit-linear-gradient(top, rgba(0,0,0,0) 0%,rgba(0,0,0,0.65) 100%);
		background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.65) 100%);
		filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#a6000000',GradientType=0 );
	}
	.movie-pos-btm {
		position: absolute;
		bottom: 0;
		text-align: center;
		width: 100%;
		padding: 80px;
		left: 0;
	}
}

</style>