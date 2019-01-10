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
	name: 'home',
	components: {
		LayoutHeader
	},
	/* data() {
    	return {
    	}
	}*/
}
</script>
