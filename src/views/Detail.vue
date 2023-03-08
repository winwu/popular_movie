<template>
    <div id="detail">
        <div v-if="movie" class="detail-has-data">
            <div v-if="movie.backdrop_path" class="detail-banner" :style="{ backgroundImage: 'url(' + $conf.IMAGE_BASE_URL + 'w1280' + movie.backdrop_path + ')' }">
                <div class="container">
                    <div class="row">
                        <div class="col-12 col-lg-8">
                            <h1 class="movie-title">
                                {{ movie.title }}
                            </h1>
                            <div class="clearfix">
                                <div class="float-md-left">
                                    <img v-if="movie.poster_path" class="mb-4 poster" :src="$conf.IMAGE_BASE_URL + 'w200' +  movie.poster_path" :srcset=" $conf.IMAGE_BASE_URL + 'w400' +  movie.poster_path + ' 2x'" :alt="movie.title">
                                </div>
                                <div class="float-md-left movie-infos">
                                    <div class="movie-rel">
                                        {{ movie.release_date }}
                                        <div class="badges d-inline-block">
                                            <div class="label" :class="movie.status">{{ movie.status }}</div>
                                            <a class="label website" :href="movie.homepage" target="_blank" rel="noreferrer">Website <i class="fas fa-link"></i></a>
                                            <button class="star-btn" @click.stop.prevent="setBookmark"><i class="far fa-heart"></i></button>
                                        </div>
                                    </div>
                                    <div class="statistics">
                                        <div class="row">
                                            <div class="col-12 col-sm-2 col-md-3">
                                                <dl>
                                                    <dt>Runtime</dt>
                                                    <dd>{{ movie.runtime }} min</dd>
                                                </dl>
                                            </div>
                                            <div class="col-12 col-sm-2 col-md-3">
                                                <dl>
                                                    <dt>Vote</dt>
                                                    <dd>{{ movie.vote_average }} / 10</dd>
                                                </dl>
                                            </div>
                                            <div class="col-12 col-sm-2 col-md-3">
                                                <dl>
                                                    <dt>Popularity</dt>
                                                    <dd>{{ movie.popularity }}</dd>
                                                </dl>
                                            </div>
                                            <div class="col-12 col-sm-2 col-md-3">
                                                <dl>
                                                    <dt>Revenue</dt>
                                                    <dd>{{ movie.revenue }}</dd>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                    <p class="movie-ov">{{ movie.overview }}</p>
                                    <div v-if="movie.production_companies && movie.production_companies.length">
                                        <h4>Production companies <i class="fas fa-chevron-down"></i></h4>
                                        <ul>
                                            <li v-for="(company, idx) in movie.production_companies" :key="idx">
                                                {{ company.name }}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div><!--.detail-banner-->
            <div class="detail-bottom">
                <div class="container">
                    <div class="row">
                        <div class="col-12 col-md-3">
                            <h3>Gallery</h3>
                        </div>
                        <div class="col-12 col-md-9">
                            <ul class="nav nav-pills nav-fill">
                                <li class="nav-item">
                                    <a class="nav-link" :class="{ 'active': currentTab === 'reviews' }" @click.stop.prevent="setCurrentTab('reviews')">Reviews</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" :class="{ 'active': currentTab === 'credits' }" @click.stop.prevent="setCurrentTab('credits')">Cast & Crew</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" :class="{ 'active': currentTab === 'videos' }" @click.stop.prevent="setCurrentTab('videos')">Videos</a>
                                </li>
                            </ul>
                            <div class="section-content">
                                <!--when sub compoent active, next movie will call 3 times api.-->
                                <keep-alive>
                                    <component :is="dynamicComponent"></component>
                                </keep-alive>
                            </div>
                        </div>
                    </div>
                </div>
            </div><!--.detail-bottom-->
        </div>
    </div>
</template>

<script>
import { mapState  } from 'vuex'
export default {
    name: 'movie-detail',
    components: {
        'async-detail-reviews': () => ({
            component: import(/* webpackChunkName: "detail_reviews" */'@/views/Detail/Reviews.vue'),
            loading:  { template: `<h1>Loading...</h1>` },
            error: { template: `<h1>Error, Sorry!</h1>` },
            delay: 30000,
            timeout: 6000
        }),
        'async-detail-credits': () => import(/* webpackChunkName: "detail_credits" */'@/views/Detail/Credits.vue'),
        'async-detail-videos': () => import(/* webpackChunkName: "detail_videos" */'@/views/Detail/Videos.vue')
    },
    data() {
        return {
            currentTab: null,
            movie: null,
            videos: []
        }
    },
    mounted() {
        if (this.$route.params.currentTab && this.$route.params.currentTab !== '') {
            this.currentTab = this.$route.params.currentTab;
        } else {
            this.currentTab = 'reviews';
        }
    },
    computed: {
        ...mapState({
            isLogin: state => state.auth.isLogin
        }),
        dynamicComponent() {
            if (this.currentTab === 'credits') {
                return 'async-detail-credits';
            } else if  (this.currentTab === 'videos') {
                return 'async-detail-videos';
            } else {
                return 'async-detail-reviews';
            }
        }
    },
    methods: {
        async fetchAll(movieId) {
            if (movieId) {
                this.fetchDetail(movieId);
                //this.fetchVideo(movieId);
                // this.fetchPhoto(movieId);
            }
        },
        setCurrentTab(newTab) {
            this.currentTab = newTab;
        },
        fetchDetail(movieId) {
            if (movieId) {
                this.$http
                    .get(`${ this.$conf.API_DOMAIN }movie/${ movieId }`)
                    .then(res => {
                        if (res.data) {
                            this.movie = res.data;
                        }
                    })
            }
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
        /*fetchPhoto() {
            let movieId = this.$route.params.movieId;
            if (movieId) {
                this.$http
                    .get(`${ this.$conf.API_DOMAIN }movie/${ movieId }/images`)
                    .then(res => {
                        if (res.data && res.data.results) {
                            this.videos = res.data.results;
                        }
                    })
            }
        }*/
    },
    watch: {
        currentTab: function () {
            // console.log('tab changes!', this.currentTab);
            this.$router.replace({
                name: this.$router.name,
                params: {
                    currentTab: this.currentTab
                }
            });
        }
    },
    beforeRouteEnter(to, from, next) {
        if (from.params.movieId !== to.params.movieId) {
            let movieId = to.params.movieId ? to.params.movieId : null;
            next(async vm => {
                await vm.fetchAll(movieId);
            })
        } else {
            next()
        }
    },
    async beforeRouteUpdate (to, from, next) {
        if (from.params.movieId !== to.params.movieId) {
            let movieId = to.params.movieId ? to.params.movieId : null;
            await this.fetchAll(movieId);
            next()
        } else {
            next()
        }
    }
}
</script>
<style lang="scss" scoped>
.detail-has-data {
    color: #fff;
}
.detail-banner {
    background-size: cover;
    background-position: center 10%;
    background-repeat: no-repeat;
    min-height: 700px;
    position: relative;
    &:before {
        content: ' ';
        position: absolute;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, #111 100%);
    }
    .container {
        position: relative;
        z-index: 1;
    }
    .poster {
        box-shadow: 0px 1px 20px rgba(0, 0, 0, 0.8);
        width: 200px;
        display: block;
        background: #111;
    }
    .movie-title {
        font-weight: bold;
        text-shadow: 2px 2px 15px rgba(0, 0, 0, 0.7);
        color: #fff;
        font-size: 36px;
        margin: 20px auto 30px auto;
        @media (min-width: 768px) {
            margin: 50px auto;
            font-size: 76px;
        }
    }
    .star-btn {
        background: transparent;
        border: none;
        color: #fff;
        outline: none;
        cursor: pointer;
    }
}
.movie-infos {
    @media (min-width: 768px) {
        width: calc(100% - 200px);
        padding: 0 20px;
    }
}
.movie-rel {
    font-size: 12px;
    margin-bottom: 20px;
}
.badges {
    margin: 0 5px;
    .label {
        display: inline-block;
        text-decoration: none;
        border-radius: 5px;
        padding: 0px 10px;
        font-size: 12px;
        margin: 0 3px;
        box-sizing: border-box;
    }
    .label.Released {
        border: 1px solid #FFC107;
        background: #FFC107;
        color: #111;
    }
    .label.website {
        border: 1px solid #fff;
        color: #fff;
        &:hover {
            background: #fff;
            color: #111;
        }
    }
}
.movie-ov {

}
.statistics {
    dl {
        dt {

        }
        dd {
            font-weight: normal;
        }
    }
}
.detail-bottom {
    margin-bottom: 50px;
}

.nav-pills {
    .nav-link {
        cursor: pointer;
        border-radius: 0;
        color: #fff;
        background: #000;
        padding: 15px 20px;
        &.active {
            background-color: #FFC107;
            color: #111;
        }


    }
}
</style>