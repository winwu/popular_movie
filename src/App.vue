<template>
      <div id="app">
        <layout-header></layout-header>
        <main>
            <router-view/>
        </main>
        <footer id="footer">
            <div class="container">
                <div class="row">
                    <div class="col-12 col-md-6">
                        <div class="d-inline-block">
                            This is footer.
                        </div>
                        <ul class="list-inline d-inline-block">
                            <router-link tag="li" active-class="active" to="/" class="list-inline-item" exact><a class="nav-link">Home</a></router-link>
                            <router-link tag="li" active-class="active" to="/about" class="list-inline-item"><a class="nav-link">About</a></router-link>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
        <notifications position="top center"/>
      </div>
</template>

<script>
import { mapState } from 'vuex'
import LayoutHeader from '@/components/LayoutHeader'
export default {
    name: 'app',
    components: {
        LayoutHeader
    },
    computed: {
        ...mapState({
            lang: state => state.preference.checkedLang
        }),
    },
    watch: {
        lang() {
            window.location.reload();
        }
    }
}
</script>
<style lang="scss">
body {
    font-family: 'Open Sans', 'Noto Sans', sans-serif;
    background: #111;
    color: #e0e0e0;
}
main {
    margin-top: 61px;
}

@media (min-width: 1480px) {
    .container {
        max-width: 1440px;
    }
}
.page-link {
    outline: none;
    background: transparent;
    border: none;
    color: #fff;
    border-radius: none;
    &:hover {
        background: transparent;
    }
}
.page-item.disabled .page-link {
    background: transparent;
}
.page-item.active .page-link {
    background: transparent;
    color: #FFC107;
}
#footer {
    a {
        color: #eee;
        font-size: 12px;
    }
}
.notifications {
    top: 70px!important;
}
.vue-notification {
    padding: 10px;
    margin: 0 5px 5px;
    font-size: 12px;
    color: #fff;
    background: #272727;
    border-left: 5px solid #111111;
    &.warn {
        background: #ffb648;
        border-left-color: #f48a06;
    }
    &.error {
        background: #E54D42;
        border-left-color: #B82E24;
    }
    &.success {
        background: #68CD86;
        border-left-color: #42A85F;
    }
}
</style>

