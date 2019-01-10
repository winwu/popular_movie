<template>
    <router-link class="movie-card" :to="{ name: 'movie_detail', params: { movieId: movie.id } }" :style="{ backgroundImage: 'url(' + 'https://image.tmdb.org/t/p/w500/' + movie.poster_path + ')' }">
        <div class="movie-pos-btm">
            <h2 class="movie-title">{{ movie.title }}</h2>
            <div data="vote_average">{{ movie.vote_average }}</div>
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
    &:hover {
        &:before {
            background: -webkit-linear-gradient(to bottom, rgba(17, 17, 17, 0) 0%, rgba(0, 0, 0, 0.6) 100%);
            background: linear-gradient(to bottom, rgba(17, 17, 17, 0) 0%, rgba(0, 0, 0, 0.6) 100%);
        }
    }
	&:before {
		content: ' ';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
        transition: background .3s ease-in;
		background: -webkit-linear-gradient(to bottom, rgba(17, 17, 17, 0.2) 0%, rgba(0, 0, 0, 0.83) 100%);
        background: linear-gradient(to bottom, rgba(17, 17, 17, 0.2) 0%, rgba(0, 0, 0, 0.83) 100%);
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
