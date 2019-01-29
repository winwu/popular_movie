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

        <div v-if="results.length" class="row">
            <template v-if="isLoading === true">
                <div v-for="n in 6" :key="n" class="col-12 col-md-6">
                    <content-loader
                        :height="300"
                        :width="690"
                        :speed="2"
                        primaryColor="#333"
                        secondaryColor="#666">
                        <rect x="230.5" y="21.63" rx="3" ry="3" width="241.3" height="31.693199999999997" />
                        <circle cx="172.2938280534213" cy="401.5938280534213" r="47.793828053421294" />
                        <rect x="24.5" y="21.8" rx="0" ry="0" width="180" height="257" />
                        <rect x="230.5" y="72.8" rx="0" ry="0" width="400" height="16" />
                        <rect x="229.5" y="97.8" rx="0" ry="0" width="380" height="16" />
                    </content-loader>
                </div>
            </template>
            <template v-else>
                <div v-for="item in results" :key="item.id" class="col-12 col-md-6">
                    <router-link class="discover-card" :to="{ name: 'movie_detail', params: { movieId: item.id } }">
                        <button class="star-btn" @click.stop.prevent="setBookmark"><i class="fas fa-heart"></i></button>
                        <div class="discover-card-left">
                            <div v-if="item.poster_path" class="poster" :style="{ backgroundImage: 'url(' + $conf.IMAGE_BASE_URL + 'w342/' + item.poster_path + ')' }"></div>
                            <div v-else class="poster poster-empty"></div>
                        </div>
                        <div class="discover-card-right">
                            <div class="title">{{ item.title }}</div>
                            <div class="release">{{ $t('common.release_date') }}: {{ item.release_date }}</div>
                            <div class="ov">{{ item.overview }}</div>
                            <div v-if="item.vote_count" class="average-vote">{{ item.vote_average }}</div>
                        </div>
                    </router-link>
                </div>
            </template>

            <div v-if="currentPage && totalPages > 1" class="mt-4 mb-4">
                <paginate
                    v-model="currentPage"
                    :pageCount="totalPages"
                    :pageRange="6"
                    :marginPages="2"
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
    </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import CustomDropdown from './CustomDropdown'
export default {
    name: 'discover',
    data() {
        return {
            isLoading: false,
            results: [],
            currentPage: null,
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
        ContentLoader,
        CustomDropdown
    },
    methods: {
        async initData(currentP, year, sort) {
            // this.yearSelected = year;
            // this.sortSelected = sort;

            this.currentPage = currentP;
            this.totalResults = null;
            this.totalPages = null;
            this.resultes = [];
            this.fetchPage();
        },
        fetchPage() {
            this.isLoading = true;
            this.$http
                .get(`${ this.$conf.API_DOMAIN }discover/movie`, {
                    params: {
                        page: this.currentPage,
                        sort_by: this.sortSelected,
                        year: this.yearSelected
                    }
                })
                .then(res => {
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
        setBookmark() {
            if (this.isLogin) {
                this.$notify({
                    title: 'Great!',
                    text: 'Added to favorite'
                })
            } else {
                this.$eventBus.$emit('open-login');
            }
        }
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
        next((async vm => {
            await vm.initData(page, year, sort);
        }))
    },
    async beforeRouteUpdate (to, from, next) {
        let page = to.query.page ? +to.query.page : 1;
        let year = to.query.year ? to.query.year : this.yearSelected;
        let sort = to.query.sort ? to.query.sort : this.sortSelected;
        await this.initData(page, year, sort);
        next()
    }
}
</script>

<style lang="scss" scoped>
.discover-card {
    position: relative;
    min-height: 300px;
    display: block;
    color: #fff;
    text-decoration: none;
    margin: 15px auto;
    background: rgba(4, 4, 4, 0.7);
    border-radius: 5px;
    overflow: hidden;
    &:hover {
        .title {
            color: #FFC107;
        }
    }
    .star-btn {
        position: absolute;
        right: 20px;
        top: 0px;
        border: none;
        width: 30px;
        height: 30px;
        border-radius: 0 0 3px 3px;
        background: #FFC107;
        z-index: 2;
        cursor: pointer;
    }
    .discover-card-left {
        position: absolute;
        width: 200px;
        top: 0;
        height: 100%;
        .poster {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center center;
            &.poster-empty {
                background-color: #333;
            }
        }
    }
    .discover-card-right {
        margin-left: 200px;
        padding: 15px;
        font-size: 14px;
        .title {
            font-size: 24px;
            margin-bottom: 20px;
            padding-right: 46px;
        }
        .ov {
            height: 66px;
            overflow: hidden;
        }
    }
}
</style>
