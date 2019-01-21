<template>
	<header id="header">
		<nav class="navbar navbar-expand-lg navbar-dark p-0 fixed-top">
			<div class="container">
				<router-link to="/" class="navbar-brand" exact>Movies & TVs</router-link>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav mr-auto">
						<router-link tag="li" active-class="active" :to="{ name: 'discover' }" class="nav-item mr-md-3">
							<a class="nav-link">{{ $t('common.discover') }}</a>
						</router-link>
						<li>
							<search-bar></search-bar>
						</li>
					</ul>
					<div class="dropdown mr-2">
						<button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownLangMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							{{ checkedLangObj.text }}
						</button>
						<div class="dropdown-menu" aria-labelledby="dropdownLangMenu">
							<button v-for="lang in langList" :key="lang.key" class="dropdown-item" type="button" :class="{ disabled: lang.key === checkedLang }" @click.prevent="setLangAction(lang.key)">{{ lang.text }}</button>
						</div>
					</div>
					<template v-if="isLogin && loginUser">
						<div>{{ $t('common.hello', { name: loginUser.name }) }} <a href="#" @click.stop.prevent="logout">{{ $t('common.logout') }}</a></div>
					</template>
					<template v-else>
						<a href="#" class="btn btn-link" @click.stop.prevent="openLogin">{{ $t('common.login') }}</a>
					</template>
				</div>
			</div>
		</nav>
		<!-- Modal -->
		<modal ref="login-modal" append-class="login-modal">
			<div slot="body">
				<h2>{{ $t('common.login') }}</h2>
			</div>
			<div slot="body">
				<div class="modal-body">
					<form class="text-left" @submit.prevent="login">
						<div v-if="isAjaxing === true" class="loading-mask">
							<div class="spinner"></div>
						</div>
						<template v-show="isAjaxing === false">
							<div class="form-group">
								<label for="inputEmail">{{ $t('login.email_address') }}</label>
								<input v-model="auth.email" type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email">
								<small id="emailHelp" class="form-text text-muted">{{ $t('login.we_ll_never_share_your_email_with_anyone') }}</small>
							</div>
							<div class="form-group">
								<label for="inputPassword">{{ $t('login.password') }}</label>
								<input v-model="auth.password" type="password" class="form-control" id="inputPassword" placeholder="Password">
							</div>
						</template>
						<button type="submit" class="btn btn-warning btn-block" :disabled="isAjaxing === true">{{ $t('login.login_btn') }}</button>
					</form>
				</div>
			</div>
		</modal>
	</header>
</template>

<script>
import loginApi from '../api/login'
import { mapGetters, mapState, mapActions  } from 'vuex'
import SearchBar from '@/components/SearchBar'
import Modal from '@/components/Modal'
export default {
	name: 'layout-header',
	components: {
		SearchBar,
		Modal
	},
	data() {
		return {
			isAjaxing: false,
			auth: {
				email: '',
				password: ''
			}
		}
	},
	computed: {
		...mapState({
			loginUser: state => state.auth.user,
			isLogin: state => state.auth.isLogin,
			langList: state => state.preference.langList,
			checkedLang: state => state.preference.checkedLang
		}),
		...mapGetters('preference', {
			checkedLangObj: 'checkedLangObj'
		})
	},
	mounted() {
	},
	methods: {
		...mapActions('preference', [
			'setLangAction'
		]),
		openLogin() {
			this.$eventBus.$emit('open-login');
		},
		login() {
			this.isAjaxing = true;
			loginApi.mockLogin(this.auth, (user) => {
				this.$store.dispatch('auth/login', user)
				this.isAjaxing = false;
				this.$eventBus.$emit('close-login');
				this.$notify({
					type: 'success',
                    text: 'Welcome back!'
                })
			})
		},
		logout() {
			loginApi.mockLogout(()=> {
				this.$store.dispatch('auth/logout');
				this.$notify({
					type: 'success',
                    text: 'Logout success!'
                })
			});
		}
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
	a {
		color: #FFC107;
	}
}

#dropdownLangMenu {
	background: #000;
	border: 1px solid #FFC107;
	color: #FFC107;
}
.dropdown-menu {
	width: 100%;
	min-width: 120px;
}

.loading-mask {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.7);
}
.spinner {
	width: 40px;
	height: 40px;
	background-color: #FFC107;
	margin: 100px auto;
	animation: sk-rotateplane 1.2s infinite ease-in-out;
}

@-webkit-keyframes sk-rotateplane {
	0% { -webkit-transform: perspective(120px) }
	50% { -webkit-transform: perspective(120px) rotateY(180deg) }
	100% { -webkit-transform: perspective(120px) rotateY(180deg)  rotateX(180deg) }
}

@keyframes sk-rotateplane {
	0% {
		transform: perspective(120px) rotateX(0deg) rotateY(0deg);
	} 50% {
		transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
	} 100% {
		transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  	}
}
</style>

<style lang="scss">
.login-modal {
	position: relative;
	.modal-container {
		max-width: 400px;
	}
}
</style>
