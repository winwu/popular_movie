<template>
    <router-link class="movie-card" :to="{ name: 'movie_detail', params: { movieId: movie.id } }" :style="{ backgroundImage: 'url(' + 'https://image.tmdb.org/t/p/w500/' + movie.poster_path + ')' }">
        <div class="movie-pos-btm">
            <h2 class="movie-title">{{ movie.title }}</h2>
			<div class="vote-average">{{ movie.vote_average }}</div>
        </div>
    </router-link>
</template>

<script>
export default {
	name: 'MovieCard',
	props: {
		movie: Object
	},
  	/*data() {
    	return {
      		datas: []
    	}
  	},*/
  	mounted() {
	},
	methods: {
	}
}
</script>

<style lang="scss">
.movie-card {
    display: block;
	min-height: 500px;
	background-size: cover;
    background-position: center center;
	color: #fff;
	padding: 20px;
	position: relative;
	overflow: hidden;
    &:hover {
		color: #fff;
    }
	&:before {
		content: ' ';
		position: absolute;
		top: 50%;
		left: 0;
		width: 101%;
		height: 50%;
		pointer-events: none;
		background: linear-gradient(to bottom, rgba(17, 17, 17, 0) 0%, rgba(17, 17, 17, 0.75) 25%, rgba(0, 0, 0, 0.95) 100%);
	}
	.movie-pos-btm {
		position: absolute;
		bottom: 0;
		text-align: center;
		width: 100%;
		padding: 50px;
		left: 0;
		.vote-average {
			border: 1px solid #FFC107;
			width: 80px;
			height: 80px;
			border-radius: 100%;
			margin: 0 auto;
			color: #FFC107;
			line-height: 80px;
			font-size: 24px;
			font-weight: lighter;
			margin-top: 20px;
		}
	}
}
</style>
