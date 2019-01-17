<template>
	<div>
		<div class="container">
			<div class="display-3 mb-4">Now Playing</div>
		</div>
		<div class="home-slides mb-5">
			<slick
				ref="slick"
				:options="slickOptions">
				<template v-if="loaded === false && nowPlaying.length < 1">
					<div class="pl-2 pr-2" v-for="n in 3" :key="n">
						<div class="slide-movie">
							<div class="movie-bp"></div>
						</div>
					</div>
				</template>
				<template v-else>
					<div class="pl-2 pr-2" v-for="movie in nowPlaying" :key="movie.id">
						<router-link class="slide-movie" :to="{ name: 'movie_detail', params: { movieId: movie.id } }">
							<!-- <div class="movie-bp" :style="{ backgroundImage: 'url(' + $conf.IMAGE_BASE_URL + 'w780' + movie.backdrop_path + ')' }"></div> -->
							<div class="movie-cover">
								<img :data-lazy="$conf.IMAGE_BASE_URL + 'w780' + movie.backdrop_path">
							</div>
							<div class="movie-btm">
								<h2>{{ movie.title }}</h2>
								<div class="movie-rd">{{ movie.release_date }}</div>
								<div class="movie-ov">{{ movie.overview }}</div>
							</div>
						</router-link>
					</div>
				</template>
			</slick>
		</div>
	</div>
</template>
<script>
import Slick from 'vue-slick'
import "slick-carousel/slick/slick.css"

export default {
	name: 'now-playing',
	components: {
		Slick
	},
	data() {
		return {
			nowPlaying: [],
			loaded: false,
			slickOptions: {
				centerMode: true,
				centerPadding: '0px',
				slidesToShow: 3,
				lazyLoad: 'ondemand',
				speed: 300,
				responsive: [
					{
						breakpoint: 1280,
						settings: {
							arrows: false,
							centerMode: true,
							centerPadding: '0px',
							slidesToShow: 1
						}
					}
				]
			}
		}
	},
	mounted() {
		this.fetchNowPlaying();
	},
	methods: {
		fetchNowPlaying() {
			this.nowPlaying = [];
			this.$http
				.get(`${ this.$conf.API_DOMAIN }movie/now_playing?api_key=${ this.$conf.API_KEY }&language=${ this.$conf.API_LANG }`)
				.then(res => {
					if (res.data && res.data.results) {
						this.nowPlaying = res.data.results;
						this.loaded = true;
					}
				})
				.finally(() => {
					this.loaded = true;
				})
		},
		/*handleLazyLoaded(event, slick, image, imageSource) {
			console.log('handleLazyLoaded', image);
		},
		handleLazeLoadError(event, slick, image, imageSource) {
			console.log('handleLazeLoadError', event, slick, image, imageSource);
		}*/
	},
	watch: {
		nowPlaying() {
			this.$refs.slick.destroy()
			this.$nextTick(() => {
				this.$refs.slick.create()
			})
		}
	}
}
</script>


<style lang="scss">
.home-slides {
	position: relative;

	&:after {
		pointer-events: none;
		content: ' ';
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background: linear-gradient(to right, rgba(0,0,0,0.65) 0%,rgba(0,0,0,0) 30%,rgba(0,0,0,0) 70%,rgba(0,0,0,1) 100%);
	}
	// .slick-slide {}
	.slick-arrow {
		position: absolute;
		z-index: 1;
		top: 50%;
		height: 30px;
		margin-top: -15px;
		background: transparent;
		border: none;
		color: #fff;
		cursor: pointer;
		outline: none;
		min-width: 100px;
	}
	.slick-prev {
		left: 30px;
		text-align: left;
	}
	.slick-next {
		right: 30px;
		text-align: right;
	}
}
.slide-movie {
	position: relative;
	height: 450px;
	overflow: hidden;
	display: block;
	color: #eee;
	outline: none;
	border-radius: 10px;
	&:hover {
		color: #fff;
	}

	.movie-cover {
		img {
			// slick.js will set opacity to 1
			opacity: 0;
			width: 100%;
			object-fit: cover;
			height: 100%;
		}
	}

	.movie-bp,
	.movie-cover {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center center;
		background-color: #333;
		z-index: -1;
	}
	// .movie-rd {}
	.movie-ov {
		height: 40px;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		font-size: 13px;
	}
	.movie-btm {
		position: absolute;
		width: 100%;
		left: 0;
		bottom: 0;
		height: auto;
		padding: 15px 20px;
		background: rgb(0, 0, 0);
	}
}
</style>