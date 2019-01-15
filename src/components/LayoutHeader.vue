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
                    <a href="#" class="btn btn-link" data-toggle="modal" data-target="#exampleModalCenter">Login</a>
                </div>
            </div>
        </nav>
        <!-- Modal -->
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalCenterTitle">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
        </div>
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
