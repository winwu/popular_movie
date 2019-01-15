<template>
	<transition v-if="active === true" name="modal">
		<div class="modal-mask" @click.stop="clickMask">
			<div id="click-mask-area" class="modal-wrapper" :class="appendClass">
				<div class="modal-container">
					<button @click.prevent="close" class="close_btn"><i class="far fa-times-circle"></i></button>
					<div class="dis-table">
						<div class="dis-table-cell">
							<slot name="header">
								<div class="modal-header"><!-- default --></div>
							</slot>
							<slot name="body">
								default modal body
							</slot>
							<slot name="footer"><!-- default --></slot>
						</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import { EventBus } from '@/EventBus'
export default {
	name: 'modal',
	data() {
		return {
			active: false
		}
	},
	props: {
		modalId: {
			default: 'none'
        },
        appendClass: {
            default: ''
        }
	},
	watch: {
		active(value) {
            var $ = document.querySelector.bind(document);
            var $body = $('body');
            if (value === true) {
                $body.classList.add('modal-open');
			} else {
                $body.classList.remove('modal-open');
			}
		}
	},
	methods: {
		open() {
			this.active = true;
			EventBus.$emit('modal_open');
		},
		close() {
			this.active = false;
			EventBus.$emit('modal_close', { modalId: this.modalId });
		},
		clickMask(e) {
			// 點擊遮罩
			if (e.target.id === 'click-mask-area') {
				e.preventDefault();
				this.close();
			}
		},
		resetBodyClass() {
			this.active = false;
            var $ = document.querySelector.bind(document);
            var $body = $('body');
            if ($body.classList.value.includes('modal-open') === true) {
                $body.classList.remove('modal-open');
            }
		}
	},
	beforeDestroy() {
		this.resetBodyClass();
	}
}
</script>

<style lang="scss">

body.modal-open {
	overflow: hidden;
}

.modal-mask {
	position: fixed;
	z-index: 100;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.7);
    transition: opacity .33s ease;
	.close_btn {
		z-index: 20;
		border: none;
		font-size: 40px;
		color: #FFC107;
		position: absolute;
		display: inline-block;
		background: transparent;
		right: -5px;
		top: -74px;
		width: 44px;
		height: 44px;
		outline: none;
		cursor: pointer;
		&:hover {
			color: #fff;
		}
	}
}

.modal-wrapper {
    text-align: center;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    padding: 0 8px;
    box-sizing: border-box;
    overflow: hidden;
    &:before {
        content: '';
        display: inline-block;
        height: 100%;
        vertical-align: middle;
    }
}

.modal-container {
    width: 100%;
    max-width: 1140px;
    position: relative;
    display: inline-block;
    vertical-align: middle;
    background: #000;
    padding: 20px;
    box-sizing: border-box;
    margin: 40px auto;
    border-radius: 0;
    border: 7px solid #FFC107;
	.modal-body {
		max-height: 60vh;
		overflow-y: auto;
		overflow-x: hidden;
		min-height: 100px;
		height: 100%;
	}
	.modal-header {
		border: none;
		display: block;
		border-radius: 0;
		text-align: center;
	}
	.dis-table {
		display: table;
		height: 100%;
		width: 100%;
	}
	.dis-table-cell {
		display: table-cell;
		vertical-align: middle;
	}
}

.modal-enter {
	opacity: 0;
}

.modal-leave-active {
	opacity: 0;
}
</style>
