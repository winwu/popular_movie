<template>
    <div id="search-bar" v-click-outside="close">
        <form class="my-2 my-lg-0">
			<input ref="search-input"
				v-model="query"
				@keydown.down.prevent="keyDown"
				@keydown.up.prevent="keyUp"
				@keydown.enter.prevent="hit"
				type="text" :placeholder="$t('common.search_placeholder')" autocomplete="off">
        </form>
		<div v-if="results$" class="search-result">
			<div v-for="(item, idx) in results$" :key="item.id"
				@click.prevent.stop="go(item)"
				:class="{ 'active': current === idx }"
				class="search-card clearfix">
				<div class="search-card-left">
					<div class="vote">{{ item.vote_average }}</div>
				</div>
				<div class="search-card-right">
					<div>
						<div class="item-type">Movie</div>
						<div class="item-name">{{ item.title }}</div>
					</div>
					<div class="item-desc">
						{{ item.overview }}
					</div>
				</div>
			</div>
		</div>
    </div>
</template>
<script>
import ClickOutside from 'vue-click-outside'
import { Observable } from 'rxjs'
export default {
	name: 'SearchBar',
	directives: {
		ClickOutside
	},
	data() {
		return {
			// isVisible: false,
			query: '',
			current: -1,
			dataLength: null,
			inVueResults: []
		}
	},
	subscriptions() {
		const input$ = this.$watchAsObservable('query')
			.pluck('newValue')
			.debounceTime(500)
			.distinctUntilChanged()
			.share();

		const results$ = input$
			.switchMap((keyword) => {
				keyword = keyword.trim();
				if (!keyword) {
					this.inVueResults = [];
					this.dataLength = null;
					this.current = -1;
					return Observable.of([]);
				} else {
					// 發 api
					return Observable
						.fromPromise(this.$http.get(`${ this.$conf.API_DOMAIN }search/movie?include_adult=false&query=${ keyword }&page=1`))
						.flatMap((res) => {
							console.info('res', res);
							if (+res.status === 200 && res.data && res.data.results.length > 0) {
								this.dataLength = res.data.results.length;
								this.inVueResults = res.data.results;
								return Observable.of(res.data.results);
							} else {
								return Observable.of([]);
							}
						})
						.catch(() => Observable.of([]))
				}
			}).share();
			const loading$ = new Observable.merge(
				input$.map((txt) => txt.length !== 0 ? true : false),
				results$.map(() => { return false })
			).startWith(false);
		return {
			results$,
			loading$
		}
    },
	methods: {
		open() {
			// this.isVisible = !this.isVisible;
		},
		close() {
			// this.isVisible = false;
			this.query = '';
			this.current = -1;
		},
		go(item) {
			this.close();
			this.$router.push({ name: 'movie_detail', params: { movieId: item.id }});
		},
        hit() {
            if (this.current !== null && this.inVueResults[this.current]) {
                // console.log('hit movie', this.inVueResults[this.current].id);
                this.go(this.inVueResults[this.current]);
            }
        },
        keyUp () {
            if (this.current <= 0) {
                this.current = this.dataLength - 1
            } else if (this.current <= this.dataLength -1) {
                this.current--;
            }
		},
		keyDown () {
			if (this.current < this.dataLength - 1) {
				this.current++;
			} else {
				this.current = 0;
            }
		}
	},
	/*watch: {
        'isVisible': function () {
			if (this.isVisible === true) {
				this.$nextTick(() => {
					this.$refs['search-input'].focus();
				});
            } else {
                this.current = -1;
            }
        }
	}*/
}
</script>

<style lang="scss" scoped>
#search-bar {
	position: relative;
	input {
		border: none;
		background: transparent;
		border-bottom: 1px solid #FFC107;
		width: 320px;
		color: #fff;
		outline: none;
		height: 40px;
	}
	.search-result {
		position: absolute;
		right: 0;
		top: 43px;
		width: 320px;
		max-height: 380px;
		overflow-y: scroll;
		overflow-x: hidden;
		background: linear-gradient(to bottom, rgba(255,193,7,0.9) 0%,rgba(0,0,0,0.9) 100%);
	}
	.search-card {
		position: relative;
		padding: 5px 15px 5px 5px;
		overflow: hidden;
		// background: #000;
		cursor: pointer;
		&:hover {
			background: #111;
		}
		&.active {
			background: #111;
		}
		.search-card-left,
		.search-card-right {
			float: left;
		}
		.search-card-left {
			position: absolute;
			width: 50px;
			top: 5px;
			left: 5px;
			padding: 0 10px;
			text-align: center;
		}
		.search-card-right {
			padding-left: 50px;
			.item-type {
				font-size: 12px;
				background: #607D8B;
				display: inline-block;
				padding: 0 8px;
				border-radius: 5px;
				line-height: 14px;
				&.item-type-tv {
					background: #795548;
				}
			}
			.item-name {
				font-size: 14px;
			}
			.item-desc {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				width: 230px;
				font-size: 12px;

			}
		}
	}
}
</style>
