<template>
    <div id="search-bar">
        <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            <!-- <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> -->
        </form>
    </div>
</template>
<script>
export default {
    name: 'SearchBar',
    props: {

  	},
  	data() {
    	return {
      		datas: []
    	}
  	},
  	mounted() {
	},
	methods: {

	}
}
</script>

<style lang="scss" scoped>
#search-bar {

}
</style>
