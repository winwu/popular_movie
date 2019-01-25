<template>
    <div class="custom-dropdown" v-click-outside="close">
        <label for="inputYear">{{ labelTitle }}</label>
        <div class="custom-dd" :class="{ active : active}">
            <div class="custom-dd-selected" @click="toggleOpen">
                <div class="custom-dd-selected-text">{{ selected }}</div>
                <i class="custom-dd-arrow">
                    <i class="fas fa-chevron-down"></i>
                </i>
            </div>
            <div v-if="lists" class="custom-dd-list">
                <div v-for="(item, index) in lists"
                    :key="index"
                    :class="{ active : isItemActive(item) }"
                    @click.stop="setActive(item)"
                    class="custom-dd-item">{{ item.hasOwnProperty('value') ? item.value : item }}</div>
            </div>
        </div>
    </div>
</template>
<script>
import ClickOutside from 'vue-click-outside'
export default {
    name: 'custom-dropdown',
    directives: {
		ClickOutside
	},
    props: {
        labelTitle: {
            type: String,
            required: true
        },
        selectedValue: {
            required: true
        },
        lists: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            active: false,
            selected: null
        }
    },
    mounted() {
        this.selected = this.selectedValue;
    },
    methods: {
        toggleOpen() {
            this.active = !this.active;
        },
        isItemActive(item) {
            if (typeof item === 'object' && item !== null) {
                return item.value === this.selectedValue;
            } else {
                return (item === this.selectedValue);
            }
        },
        close() {
            this.active = false;
        },
        setActive(item) {
            this.close();
            if (typeof item === 'object' && item !== null) {
                this.$emit('update:selectedValue', item.value)
                this.selected = item.value;
            } else {
                this.$emit('update:selectedValue', item)
                this.selected = item;
            }


        }
    }
}
</script>
<style lang="scss" scoped>
.custom-dd {
    position: relative;
    color: #fff;
    .custom-dd-selected {
        padding: 6px 30px 6px 10px;
        border-radius: 3px;
        position: relative;
        cursor: pointer;
        background: #9E9E9E;
        &:hover {
            background: darken(#9E9E9E, 5%);
        }
    }
    .custom-dd-arrow {
        position: absolute;
        width: 30px;
        height: 100%;
        top: 0;
        right: 0;
        padding: 0 5px;
        line-height: 30px;
        text-align: center;
        i {
            transform-origin: 50% 50%;
        }
    }
    &.active {
        .custom-dd-list {
            display: block;
        }
        .custom-dd-arrow {
            i {
                transform: rotate(-180deg);
            }
        }
    }
    .custom-dd-list {
        display: none;
        position: absolute;
        background: #666;
        width: 100%;
        max-height: 400px;
        overflow-y: scroll;
        left: 0;
        z-index: 1;
        border-radius: 3px;
        overflow: hidden;
        .custom-dd-item {
            padding: 6px 10px;
            cursor: pointer;
            &:hover {
                background: #444;
            }
        }
    }
}
</style>

