<template>
    <div id="notification-wrap"  v-click-outside="close" :class="{ active: isActive }">
        <div class="notification-icon" @click.stop="toggleActive">
            <i class="fas fa-bell"></i>
        </div>
        <div class="notification-list">
            <div id="notification-list-cont">
                <h2 class="noti-title">Notification</h2>
                <div>
                    <div v-for="item in datas" :key="item.id">{{ item.title }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
export default {
    name: 'notification',
    directives: {
        ClickOutside
    },
    data() {
        return {
            isActive: false,
            currentPage: 1,
            datas: [],
            totalPages: null
        }
    },
    mounted() {
        this.initPage1();
    },
    methods: {
        initPage1() {
            this.$http
                .get(`${ this.$conf.API_DOMAIN }movie/popular`, {
                    params: {
                        page: this.currentPage
                    }
                })
                .then(res => {
                    // console.log('res', res);
                    if (res.data && res.data.results) {
                        this.datas = res.data.results;
                        this.totalPages = res.data.total_pages;
                    }
                })
                .finally(() => {

                })
        },
        toggleActive() {
            this.isActive = !this.isActive;
        },
        close() {
            this.isActive = false;
        }
    }
}
</script>

<style lang="scss">
#notification-wrap {
    position: relative;
    &.active,
    &:hover {
        .notification-icon {
            color: #FFC107;
        }
    }
    &.active {
        .notification-list {
            display: block;
        }
    }
    .notification-icon {
        position: relative;
        padding: 4px 15px;
        cursor: pointer;
    }
}
.notification-list {
    display: none;
    position: absolute;
    height: 200px;
    overflow: auto;
    width: 350px;
    top: 44px;
    background: #f3f3f3;
    right: -10px;
    border-radius: 5px;
    z-index: 2;
    padding: 0 15px;
    &:before {
        content: ' ';
        position: absolute;
        width: 0;
        height: 0;
        top: -9px;
        right: 17px;
        border-style: solid;
        border-width: 0 15px 15px 15px;
        border-color: transparent transparent #f0f0f0 transparent;
    }
    .noti-title {
        font-size: 26px;
        font-weight: bold;
        color: #333;
        margin: 15px auto;
    }
}
</style>

