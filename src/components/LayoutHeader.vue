<template>
    <header id="header">
        <nav class="navbar navbar-expand-lg navbar-dark p-0 fixed-top">
            <div class="container">
                <router-link to="/" class="navbar-brand" exact>Popluars</router-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <!-- <router-link tag="li" active-class="active" to="/" class="nav-item" exact><a class="nav-link">Home</a></router-link>
                        <router-link tag="li" active-class="active" to="/about" class="nav-item"><a class="nav-link">About</a></router-link> -->
                        <li>
                            <search-bar></search-bar>
                        </li>
                    </ul>
                    <div class="dropdown mr-2">
                        <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            zh-TW
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <button class="dropdown-item" type="button">en-US</button>
                        </div>
                    </div>
                    <a href="#" class="btn btn-link" @click.stop.prevent="openLogin">Login</a>
                </div>
            </div>
        </nav>
        <!-- Modal -->
        <modal ref="login-modal" append-class="login-modal">
            <div slot="body">
                <h2>Login</h2>
            </div>
            <div slot="body">
                <div class="modal-body">
                    <form class="text-left">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                        </div>
                        <button type="submit" class="btn btn-warning btn-block">Submit</button>
                    </form>
                </div>
            </div>
        </modal>
    </header>
</template>

<script>
import SearchBar from '@/components/SearchBar'
import Modal from '@/components/Modal'
export default {
    name: 'layout-header',
    components: {
        SearchBar,
        Modal
    },
    mounted() {
        this.$eventBus.$on('open-login', () => {
            this.$refs['login-modal'].open();
        });
    },
    methods: {
        openLogin() {
            this.$eventBus.$emit('open-login');
        }
    }
}
</script>

<style lang="scss" scoped>
#header {
    .fixed-top {
        z-index: 5;
    }
    .navbar {
        background: rgba(17, 17, 17, 0.9);
    }
    .navbar-brand {
        background: #FFC107;
        font-size: 14px;
        font-weight: bold;
        color: #000;
        padding: 20px 5px;
    }
}
</style>

<style lang="scss">
.login-modal {
    .modal-container {
        max-width: 400px;
    }
}
</style>
