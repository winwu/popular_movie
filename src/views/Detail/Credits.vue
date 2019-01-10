<template>
    <div class="credit-container">
        <template v-if="datas.length">
            <div v-for="cast in datas" :key="cast.id" class="cast-card">
                <div class="cast-anme">{{ cast.name }}</div>
            </div>
        </template>
        <template v-else>
            <div class="no-data-b mt-4 mb-4 p-2">No data.</div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'detail-credit',
    data() {
        return {
            datas: []
        }
    },
    mounted() {
        this.fetchCredits();
    },
    methods: {
        fetchCredits() {
            let movieId = this.$route.params.movieId;
            if (movieId) {
                this.$http
                    .get(`${ this.$conf.API_DOMAIN }movie/${ movieId }/credits?api_key=${ this.$conf.API_KEY }&language=${ this.$conf.API_LANG }&page=1`)
                    .then(res => {
                        if (res.data) {
                            this.datas = res.data.cast;
                        }
                    })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.cast-card {

}
</style>

