<template>
	<nav
		class="navbar navbar-expand-lg align-items-lg-end shadow-lg mb-0 px-5 border-bottom"
	>
		<router-link class="navbar-brand" to="/">
			<img
				class="hmcLogo"
				src="@/assets/img/hmc-logo.svg"
				alt="HMC mbo vakschool"
			/>
		</router-link>
		<button
			class="navbar-toggler collapsed"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navigation"
			aria-controls="navigation"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="icon-bar top-bar"></span>
			<span class="icon-bar middle-bar"></span>
			<span class="icon-bar bottom-bar"></span>
		</button>
		<div class="collapse navbar-collapse py-3 py-lg-0" id="navigation">
			<ul class="navbar-nav ms-auto">
				<li class="nav-item" :class="$route.path === '/' ? 'active' : ''">
					<router-link class="nav-link" to="/">Home</router-link>
				</li>
				<li class="nav-item" :class="$route.path === '/libary' ? 'active' : ''">
					<router-link class="nav-link" to="/libary">Bibliotheek</router-link>
				</li>
				<!-- <li
					class="nav-item"
					:class="$route.path === '/mission' ? 'active' : ''"
				>
					<router-link class="nav-link" to="/mission"
						>Onze missie</router-link
					>
				</li> -->
				<li class="nav-item " v-if="user">
					<router-link class="nav-link" to="/profile">Profiel</router-link>
				</li>
				<li class="nav-item d-lg-none" v-if="user">
					<a class="nav-link" href="#" @click="logout">Uitloggen</a>
				</li>

				<li class="nav-item" v-if="isEditor || isAdmin">
					<router-link to="/dashboard" class="nav-link">Dashboard</router-link>
				</li>
				<li class="nav-item" v-if="!user">
					<router-link to="/Login" class="nav-link">Inloggen</router-link>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script>
	import { mapGetters } from "vuex";
	export default {
		computed: {
			...mapGetters(["user", "isEditor", "isAdmin"])
		},
		methods: {
			logout() {
				this.$store.dispatch("logout");
				this.$router.push("/libary");
			}
		}
	};
</script>

<style lang="scss" scoped>
	.pointer {
		cursor: pointer;
	}
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

	.navbar-brand {
		overflow-y: none;
		max-height: 130px;
		display: flex;
		justify-content: center;
		align-items: center;

		.hmcLogo {
			bottom: 2rem;
			right: 2rem;
			height: 200px;
			max-width: calc(25px + 15vmin);
		}
	}
</style>
