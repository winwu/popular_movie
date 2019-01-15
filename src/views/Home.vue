<template>
  	<div id="home" class="container">
		<div v-if="populars" class="row no-gutters">
			<template v-if="loaded === true">
				<div v-for="n in 8" :key="n" class="col-12 col-md-6 col-lg-3">
					<content-loader
						:height="500"
						:width="352"
						:speed="2"
						primaryColor="#f3f3f3"
						secondaryColor="#ecebeb">
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

			<template v-if="totalPages > 1">
				<paginate
					:pageCount="totalPages"
					:pageRange="6"
					:marginPages="2"
					:initialPage="(page-1)"
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
			</template>

		  </div>
  	</div>
</template>

<script>
import { ContentLoader } from "vue-content-loader"
import MovieCard from '@/components/MovieCard.vue'
export default {
	name: 'home',
	components: {
		MovieCard,
		ContentLoader
	},
	data() {
    	return {
			loaded: false,
			populars: [],
			page: 1,
			totalPages: 0
    	}
	},
	mounted() {
		this.fetchPopular();
	},
	methods: {
		fetchPopular() {
			this.loaded = true;
			this.populars = [];

			this.$http
				.get(`${ this.$conf.API_DOMAIN }movie/popular?api_key=${ this.$conf.API_KEY }&language=${ this.$conf.API_LANG }&page=${ this.page }`)
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
					this.loaded = false;
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
</style>