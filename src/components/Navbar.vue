<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg mb-0 px-5">
		<router-link class="navbar-brand" to="/">
			<i class="fas fa-recycle"></i>
			Restmaterialen
		</router-link>
		<button
			class="navbar-toggler collapsed"
			type="button"
			data-toggle="collapse"
			data-target="#navigation"
			aria-controls="navigation"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="icon-bar top-bar"></span>
			<span class="icon-bar middle-bar"></span>
			<span class="icon-bar bottom-bar"></span>
		</button>
		<div class="collapse navbar-collapse py-5 py-lg-0" id="navigation">
			<ul class="navbar-nav ml-auto">
				<li class="nav-item active">
					<a class="nav-link" href="#">
						Libary
						<span class="sr-only">(current)</span>
					</a>
				</li>
				<li class="nav-item">
					<router-link class="nav-link" to="/mission">Onze missie</router-link>
				</li>
				<li class="nav-item">
					<a class="nav-link" href v-if="user" @click="logout">Logout</a>
				</li>
				<li class="nav-item" v-if="!user">
					<router-link
						to="/Login"
						tag="button"
						class="btn-collapse btn btn-outline-success btn-block my-0 rounded"
					>Login</router-link>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script>
	export default {
		computed: {
			user() {
				return this.$store.getters.user;
			}
		},
		methods: {
			logout() {
				this.$store.dispatch("logout");
				this.$router.push("/");
			}
		}
	};
</script>

<style lang="scss" scoped>
	.icon-bar {
		width: 22px;
		height: 2px;
		background-color: #b6b6b6;
		display: block;
		transition: all 0.2s;
		margin-top: 4px;
	}

	.navbar-toggler {
		border: none;
		background: transparent !important;
	}
	.navbar-toggler .top-bar {
		transform: rotate(45deg);
		transform-origin: 10% 10%;
	}

	.navbar-toggler .middle-bar {
		opacity: 0;
	}

	.navbar-toggler .bottom-bar {
		transform: rotate(-45deg);
		transform-origin: 10% 90%;
	}

	.navbar-toggler.collapsed .top-bar {
		transform: rotate(0);
	}

	.navbar-toggler.collapsed .middle-bar {
		opacity: 1;
	}

	.navbar-toggler.collapsed .bottom-bar {
		transform: rotate(0);
	}
</style>
