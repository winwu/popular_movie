<template>
    <div class="genre-card" :style="{ background: data.name ? stringToHslColor(data.name, 10, 50) : '#000' }">
        <template v-if="data.name">{{ data.name }}</template>
    </div>
</template>

<script>
export default {
    name: 'genre-card',
    props: {
        data: {
            type: Object,
            default: function() {
                return {
                    name: '',
                    id: ''
                }
            }
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
    min-width: 80px;
    height: 40px;
    cursor: pointer;
    text-align: center;
}
</style>

