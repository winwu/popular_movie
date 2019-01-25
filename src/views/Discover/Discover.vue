<template>
    <div class="container">
        <div class="display-4 pt-4 pb-4">{{ $t('common.discover') }}</div>
        <form>
            <div custom-dropdown></div>
            <div class="form-row">
                <div class="form-group col-md-2">
                    <custom-dropdown label-title="Year" :selected-value.sync='yearSelected' :lists="listYear"></custom-dropdown>
                </div>
                <div class="form-group col-md-3">
                    <custom-dropdown label-title="Sort By" :selected-value.sync='sortSelected' :lists="listSort"></custom-dropdown>
                </div>
                <!-- <div class="form-group col-md-3">
                    <label for="inputYear">Genres</label>
                    <div>#TODO: tag lists</div>
                </div> >
                <div class="form-group col-md-2">
                    <label for="inputYear">Keywords</label>
                    <input type="text" class="form-control">
                </div>-->
            </div>
        </form>

        <div v-if="totalPages > 1" class="mt-4 mb-4">
            <paginate
                :pageCount="totalPages"
                :pageRange="6"
                :marginPages="2"
                :initialPage="(currentPage-1)"
                :clickHandler="renewFetch"
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
</template>

<script>
import CustomDropdown from './CustomDropdown'
export default {
    name: 'discover',
    data() {
        return {
            isLoading: false,
            results: [],
			currentPage: 1,
            totalResults: null,
            totalPages: null,
            listYear: [
                {
                    key: 2015,
                    value: 2015
                },
                {
                    key: 2016,
                    value: 2016
                },
                {
                    key: 2017,
                    value: 2017
                },
                {
                    key: 2018,
                    value: 2018
                },
                {
                    key: 2019,
                    value: 2019
                }
            ],
            yearSelected: parseInt(this.$route.query.year ? this.$route.query.year : (new Date()).getFullYear()),
            listSort: [
                {
                    key: 'popularity.desc',
                    value: 'Popularity Descending'
                },
                {
                    key: 'popularity.asc',
                    value: 'Popularity Ascending'
                },
                {
                    key: 'title.asc',
                    value: 'Title (A-Z)'
                },
                {
                    key: 'vote_average.desc',
                    value: 'Vote Average Descending'
                },
                {
                    key: 'vote_average.asc',
                    value: 'Vote Average Ascending'
                }
            ],
            sortSelected: this.$route.query.sort ? this.$route.query.sort : 'popularity.desc'
        }
    },
    components: {
        CustomDropdown
    },
    methods: {
        initData(currentP, year, sort) {
            // this.yearSelected = year;
            // this.sortSelected = sort;

            this.currentPage = currentP;
            this.totalResults = null;
            this.totalPages = null;
            this.resultes = [];
		},
        fetchPage() {
            this.isLoading = true;
            this.$http
				.get(`${ this.$conf.API_DOMAIN }discover/movie?page=${ this.currentPage }&sort_by=${ this.sortSelected }&year=${ this.yearSelected }`)
				.then(res => {
					console.log('res', res);
					if (res.data && res.data.results) {
                        this.results = res.data.results;
                        this.totalResults = res.data.total_results;
                        this.totalPages = res.data.total_pages;
                    }
                })
                .finally(() => {
                    this.isLoading = false;
                })
        },
        renewFetch(page) {
			this.currentPage = page;
			this.$router.push({
				name: this.$router.name,
				query: {
					page: this.currentPage,
					year: this.yearSelected,
					sort: this.sortSelected
				}
			});
		},
    },
    watch: {
        yearSelected() {
            console.log('year change');
            this.renewFetch(1);
        },
        sortSelected() {
            console.log('sort change');
            this.renewFetch(1);
        }
    },
    beforeRouteEnter(to, from, next) {
		let page = to.query.page ? +to.query.page : 1;
		let year = to.query.year ? to.query.year : (new Date()).getFullYear();
		let sort = to.query.sort ? to.query.sort : 'popularity.desc';
		next((vm => {
			vm.initData(page, year, sort);
			vm.fetchPage();
		}))
	},
	beforeRouteUpdate (to, from, next) {
		let page = to.query.page ? +to.query.page : 1;
		let year = to.query.year ? to.query.year : this.yearSelected;
		let sort = to.query.sort ? to.query.sort : this.sortSelected;
		this.initData(page, year, sort);
		this.fetchPage();
		next()
	}
}
</script>
