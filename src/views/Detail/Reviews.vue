<template>
    <div class="reviews-container">
        <template v-if="datas.length">
            <div v-for="review in datas" :key="review.id" class="review-card">
                <div class="rv-author">
                    <a :href="review.url" target="_blank" class="author-link">
                        <div class="author-avatar">&nbsp;</div>
                        <div class="author-name">{{ review.author }}</div>
                    </a>
                </div>
                <div class="rv-content">
                    {{ review.content }}
                </div>
            </div>
        </template>
        <template v-else>
            <div class="no-data-b mt-4 mb-4 p-2">No data.</div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'detail-review',
    data() {
        return {
            currentPage: 1,
            datas: [],
            totalPages: null,
            totalResults: null
        }
    },
    mounted() {
        this.fetchReviews();
    },
    methods: {
        fetchReviews() {
            let movieId = this.$route.params.movieId;
            if (movieId) {
                this.$http
                    .get(`${ this.$conf.API_DOMAIN }movie/${ movieId }/reviews?api_key=${ this.$conf.API_KEY }&language=${ this.$conf.API_LANG }&page=1`)
                    .then(res => {
                        if (res.data) {
                            this.currentPage = res.data.page;
                            this.datas = res.data.results;
                            this.totalPages = res.data.total_pages;
                            this.totalResults = res.data.total_results;
                        }
                    })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.review-card {
    color: #e0e0e0;
    margin: 10px auto;

    .author-link {
        color: #ffc107;
        display: inline-block;
        .author-avatar,
        .author-name {
            display: inline-block;
            vertical-align: middle;
        }
        // .author-avatar {}
        // .author-name {}
    }
}
</style>

