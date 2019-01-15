<template>
    <div>Videos</div>
</template>

<script>
export default {
    name: 'detail-videos',
    methods: {
        fetchCredits() {
            console.warn('fetch credits');
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
