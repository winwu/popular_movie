<template>
    <div class="credit-container">
        <template v-if="loaded && datas.length">
            <div class="row mt-4 mb-4">
                <div v-for="cast in datas" :key="cast.id" class="col-12 col-md-4 col-lg-3">
                    <div class="cast-card">
                        <!-- <div class="cast-pic">
                            <img v-if="cast.profile_path" :src="'https://image.tmdb.org/t/p/w154' + cast.profile_path" :alt="cast.name">
                        </div> -->
                        <div class="cast-btm">
                            <div class="cast-anme">{{ cast.name }}</div>
                            <div class="cast-character">{{ cast.character }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="row mt-4 mb-4">
                <div v-for="n in 12" :key="n" class="col-12 col-md-4 col-lg-3">
                     <content-loader
                        :height="40"
                        :width="220"
                        :speed="2"
                        primaryColor="#333"
                        secondaryColor="#666">
                        <rect x="7" y="6" rx="4" ry="4" width="117" height="6.4" />
                        <rect x="7" y="21" rx="3" ry="3" width="85" height="6.4" />
                    </content-loader>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import { ContentLoader } from "vue-content-loader"
export default {
    name: 'detail-credit',
    data() {
        return {
            loaded: false,
            datas: []
        }
    },
    components: {
        ContentLoader
    },
    methods: {
        fetchCredits() {
            let movieId = this.$route.params.movieId;
            if (movieId) {
                this.$http
                    .get(`${ this.$conf.API_DOMAIN }movie/${ movieId }/credits?api_key=${ this.$conf.API_KEY }&language=${ this.$conf.API_LANG }&page=1`)
                    .then(res => {
                        if (res.data) {
                            this.loaded = true;
                            this.datas = res.data.cast;
                        }
                    })
            }
        }
    },
    watch: {
        '$route.params.movieId': {
            handler: function() {
                this.fetchCredits();
            },
            immediate: true
        }
    }
}
</script>
<style lang="scss" scoped>
.cast-card {
    position: relative;
    &:before {
        content: ' ';
        position: absolute;
        // background: linear-gradient(to bottom, rgba(17, 17, 17, 0) 0%, rgba(17, 17, 17, 0.3) 40%, rgba(0, 0, 0, 0.83) 100%);
        width: 100%;
        height: 50%;
        bottom: 0;
        left: 0;
        pointer-events: none;
    }
    .cast-btm {
        // position: absolute;
        // z-index: 1;
        // left: 0;
        // bottom: 0;
        // width: 100%;
        padding: 10px;
        font-size: 14px;
        .cast-character {
            font-weight: bold;
            font-size: 12px;
            color: #ffc107;
        }
    }
}
</style>

