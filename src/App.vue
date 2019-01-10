<template>
  	<div id="app">
		<layout-header></layout-header>
		<main>
			<router-view/>
		</main>
  	</div>
</template>

<script>
import LayoutHeader from '@/components/LayoutHeader'
export default {
	name: 'app',
	components: {
		LayoutHeader
	},
	/* data() {
    	return {
    	}
	}*/
}
</script>
<style>
body {
	font-family: 'Noto Sans', sans-serif;
	background: #111;
}
</style>

