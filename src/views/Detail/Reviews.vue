<template>
    <div class="reviews-container">
        <template v-if="datas.length">
            <div v-for="(review) in datas" :key="review.id" class="review-card" :class="{ 'hide-more' : review.isShowMore === true }">
                <div class="rv-author">
                    <a :href="review.url" target="_blank" class="author-link">
                        <div class="author-avatar">&nbsp;</div>
                        <div class="author-name">{{ review.author }}</div>
                    </a>
                </div>
                <div class="rv-content">
                    {{ review.content }}
                </div>
                <div v-if="review.isShowMore === true" class="text-right"><div class="show-more" @click="showMore(review)">...More</div></div>
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
    methods: {
        fetchReviews() {
            let movieId = this.$route.params.movieId;
            if (movieId) {
                this.$http
                    .get(`${ this.$conf.API_DOMAIN }movie/${ movieId }/reviews?page=1`)
                    .then(res => {
                        if (res.data) {
                            this.currentPage = res.data.page;
                            this.datas = res.data.results;
                            this.datas.map((r) => {
                                this.$set(r, 'isShowMore', false);
                            });
                            this.totalPages = res.data.total_pages;
                            this.totalResults = res.data.total_results;
                            this.$nextTick(() => {
                                this.datas.map((r, index) => {
                                    let overHowMuch = document.getElementsByClassName('rv-content')[index].scrollHeight;
                                    if (overHowMuch > 95)  {
                                        this.$set(r, 'isShowMore', true);
                                    }
                                });
                            })
                        }
                    });
            }
        },
        showMore(r) {
            r.isShowMore = false;
        }
    },
    watch: {
        '$route.params.movieId': {
            handler: function() {
                this.fetchReviews();
            },
            immediate: true
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

    .rv-content {
        margin-bottom: 5px;
    }
    &.hide-more {
        .rv-content {
            max-height: 95px;
            overflow: hidden;
        }
    }
    .show-more {
        font-size: 12px;
        color: #fff;
        cursor: pointer;
        &:hover {
            text-decoration: underline;
        }
    }
}
</style>

