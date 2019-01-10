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
                        <router-link tag="li" active-class="active" to="/" class="nav-item" exact><a class="nav-link">Home</a></router-link>
                        <router-link tag="li" active-class="active" to="/about" class="nav-item"><a class="nav-link">About</a></router-link>
                    </ul>
                    <search-bar></search-bar>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
import SearchBar from '@/components/SearchBar'
export default {
    name: 'layout-header',
    components: {
		SearchBar
	}
}
</script>

<style lang="scss" scoped>
    #header {
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
