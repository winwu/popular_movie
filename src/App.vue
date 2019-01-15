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
</style>

