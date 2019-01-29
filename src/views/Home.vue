<template>
    <div id="home">
		<now-playing></now-playing>
		<section id="genre-sec">
			<div class="container mt-3">
				<div class="display-3 mb-2 title-nth-2">{{ $t('common.genre') }}</div>
			</div>
			<div class="container mb-5 position-relative">
				<!-- <div>
					<i id="genre-left" class="fas fa-angle-left"></i>
					<i id="genre-right" class="fas fa-angle-right"></i>
				</div> -->
				<div id="genre-list" class="clearfix">
					<div id="genre-list-content">
						<template v-if="loaded.genres === true">
							<genre-card v-for="n in 19" :key="n"></genre-card>
						</template>
						<template v-else>
							<genre-card v-for="g in genres" :key="g.id" :data="g"></genre-card>
						</template>
					</div>
				</div>
			</div>
		</section>
		<div class="container">
			<div class="row">
				<div class="col-12 col-md-6">
					<router-link class="type-card" :to="{ name: 'popular' }" :style="{ backgroundImage: 'url(' + 'https://source.unsplash.com/400x225/?movie,nature,popular' + ')' }">
						<div class="type-card-title">/{{ $t('common.popular') }}</div>
					</router-link>
				</div>
				<div class="col-12 col-md-6">
					<router-link class="type-card" :to="{ name: 'upcoming' }" :style="{ backgroundImage: 'url(' + 'https://source.unsplash.com/400x225/?movie,nature' + ')' }">
						<div class="type-card-title">/{{ $t('common.upcoming') }}</div>
					</router-link>
				</div>
			</div>
			<div v-if="populars" class="row no-gutters">
				<template v-if="loaded.populars === true">
					<div v-for="n in 8" :key="n" class="col-12 col-md-6 col-lg-3">
						<content-loader
							:height="500"
							:width="352"
							:speed="2"
							primaryColor="#333"
							secondaryColor="#666">
							<rect x="52.5" y="294.63" rx="3" ry="3" width="241.29800000000003" height="20.581300000000002" />
							<circle cx="172.2938280534213" cy="401.5938280534213" r="47.793828053421294" />
						</content-loader>
					</div>
				</template>
				<template v-else>
					<div v-for="movie in populars" :key="movie.id" class="col-12 col-md-6 col-lg-3">
						<movie-card :movie="movie"></movie-card>
					</div>
				</template>

				<div v-if="totalPages > 1" class="mt-4 mb-4">
					<paginate
						v-model="page"
						:pageCount="totalPages"
						:pageRange="6"
						:marginPages="2"
						:clickHandler="changePage"
						:containerClass="'pagination pagination-sm'"
						:page-class="'page-item'"
						:active-class="'page-item active'"
						:page-link-class="'page-link'"
						:prev-class="'page-item prev'"
						:prev-link-class="'page-link'"
						:next-class="'page-item next'"
						:next-link-class="'page-link'"
						:pageClass="''">
					</paginate>
				</div>
			</div>
        </div>
    </div>
</template>

<script>
import { ContentLoader } from "vue-content-loader"
import MovieCard from '@/components/MovieCard.vue'
import NowPlaying from '@/components/NowPlaying.vue'
import GenreCard from '@/components/GenreCard.vue'
export default {
	name: 'home',
	components: {
		ContentLoader,
		MovieCard,
		NowPlaying,
		GenreCard
	},
	data() {
		return {
			loaded: {
				populars: false,
				genres: false
			},
			populars: [],
			page: 1,
			totalPages: 0,
			genres: []
		}
	},
	mounted() {
		this.fetchPopular();
		this.fetchGenre();
	},
	methods: {
		fetchPopular() {
			this.loaded.populars = true;
			this.populars = [];

			this.$http
				.get(`${ this.$conf.API_DOMAIN }movie/popular`, {
                    params: {
                        page: this.page
                    }
                })
				.then(res => {
					console.log('res', res);
					if (res.data && res.data.results) {
						this.page = res.data.page;
						this.populars = res.data.results;
						if (res.data.total_pages) {
							if (res.data.total_pages > 20) {
								this.totalPages = 20;
							} else {
								this.totalPages = res.data.total_pages;
							}
						}
					}
				})
				.finally(() => {
					this.loaded.populars = false;
				})
		},
		fetchGenre() {
			this.loaded.genres = true;
			this.$http
			.get(`${ this.$conf.API_DOMAIN }genre/movie/list`)
			.then(res => {
				if (res.data && res.data.genres) {
					this.genres = res.data.genres;
				}
			})
			.finally(() => {
				this.loaded.genres = false;
			})
		},
		changePage(p) {
			console.warn('user want to p', p);
			this.$set(this, 'page', p);
			this.fetchPopular();
		}
	}
}
</script>

<style lang="scss" scoped>
#genre-sec {
	.title-nth-2 {
		background: -webkit-linear-gradient(#8BC34A, #607D8B);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	#genre-list-content {
		float: left;
		transition: transform .2s ease-in-out;
	}
	.no-transition {
		transition: none;
	}
	#genre-list {
		position: relative;
		overflow: hidden;
		// overflow-x: auto;
		// overflow-y: hidden;
		// -webkit-overflow-scrolling: touch;
		white-space: nowrap;
		// -ms-overflow-style: -ms-autohiding-scrollbar;
	}
	/* #genre-left,
	#genre-right {
		position: absolute;
		z-index: 2;
		top: 0;
		height: 100%;
		width: 30px;
		line-height: 40px;
		font-size: 30px;
		padding: 0 10px;
		cursor: pointer;
	}
	#genre-left {
		left: 15px;
		text-align: left;
	}
	#genre-right {
		right: 15px;
		text-align: right;
	}*/
}
.type-card {
	display: block;
	padding: 15px;
	border-radius: 5px;
	min-height: 240px;
	background: #333;
	margin: 15px auto;
	color: #fff;
	text-decoration: none;
	background-repeat: no-repeat;
	background-size: 100%;
	background-position: center center;
	position: relative;
	&:before {
		content: ' ';
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.6);
		transition: background .33s ease;
	}
	&:hover {
		&:before {
			background: rgba(0, 0, 0, 0.45);
		}
	}
	.type-card-title {
        font-weight: lighter;
		font-size: 40px;
		position: relative;
		z-index: 1;
	}
}
</style>
