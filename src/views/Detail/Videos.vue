<template>
    <div>
        <div class="row mt-4 mb-4">
            <template v-if="loaded === true">
                loading
            </template>
            <template v-else>
                <template v-if="!datas.length">
                    no data
                </template>
                <template v-else>
                    <div v-for="(video, idx) in datas" :key="idx" class="col-12 col-lg-6">
                        <div v-if="video.site === 'YouTube'" class="video-card" @click="show(video.key)">
                            <figure>
                                <div class="figure-mask">
                                    <img :src="'https://img.youtube.com/vi/' + video.key + '/hqdefault.jpg'" alt="">
                                    <div class="play-icon">
                                        <i class="far fa-play-circle"></i>
                                    </div>
                                </div>
                                <figcaption><i class="fab fa-youtube"></i> {{ video.name }}</figcaption>
                            </figure>
                        </div>
                    </div>
                </template>
            </template>
        </div>
        <modal ref="video-modal" append-class="video-modal">
            <div slot="body">
                <div class="modal-body">
                    <iframe v-if="selected" :src="'https://www.youtube.com/embed/' + selected+ '?rel=0'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
import Modal from '@/components/Modal.vue'
export default {
    name: 'detail-videos',
    data() {
        return {
            loaded: false,
            datas: [],
            selected: null
        }
    },
    components: {
        Modal
    },
    methods: {
        fetctVideos() {
            let movieId = this.$route.params.movieId;
            if (movieId) {
                this.loaded = true;
                this.$http
                    .get(`${ this.$conf.API_DOMAIN }movie/${ movieId }/videos`)
                    .then(res => {
                        if (res.data && res.data.results) {
                            this.datas = res.data.results;
                        }
                    })
                    .finally(() => {
                        this.loaded = false;
                    })
            }
        },
        show(key) {
            this.selected = key;
            if (this.selected) {
                this.$refs['video-modal'].open();
            }
        }
    },
    watch: {
        '$route.params.movieId': {
            handler: function() {
                this.fetctVideos();
            },
            immediate: true
        }
    }
}
</script>

<style lang="scss" scoped>
.video-card {
    cursor: pointer;
    font-size: 14px;
    img {
        max-width: 100%;
        margin-bottom: 10px;
        width: 100%;
        object-fit: cover;
    }
    .figure-mask {
        position: relative;
        .play-icon {
            position: absolute;
            width: 100%;
            text-align: center;
            top: 50%;
            font-size: 50px;
            height: 75px;
            margin-top: -32.5px;
        }
        &:before {
            content: ' ';
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.4);
            transition: background .33s ease;
        }
        &:hover {
            &:before {
                background: transparent;
            }
        }
    }
}
.video-modal {
    .modal-container .modal-body {
        min-height: 500px;
    }
    iframe {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }
}
</style>
