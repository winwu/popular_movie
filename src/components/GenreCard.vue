<template>
    <div class="genre-card" :style="{ background: stringToHslColor(data.name, 10, 50) }">
        {{ data.name }}
    </div>
</template>

<script>
export default {
    name: 'genre-card',
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    methods: {
        stringToHslColor(string, s, l) {
			var hash = 0;
			for (var i = 0; i < string.length; i++) {
				hash += string.charCodeAt(i);
			}
			var h = hash % 360;
			// return 'hsl('+h+', '+s+'%, '+l+'%)';
			return `hsl(${ h }, ${ s }%, ${ l }%)`;
		}
    }
}
</script>

<style lang="scss" scoped>
.genre-card {
    display: inline-block;
    padding: 10px 15px;
    background: #000;
    border-radius: 4px;
    margin: 0 10px 0 0;
    font-size: 14px;
    cursor: pointer;
}
</style>

