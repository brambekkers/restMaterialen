<template>
	<nav
		id="navbar"
		class="navbar navbar-expand-lg navbar-absolute fixed-top navbar-light bg-white border-bottom"
	>
		<div class="container-fluid">
			<div class="navbar-wrapper">
				<!-- Sidebar -->
				<div class="navbar-toggle">
					<button
						class="navbar-toggler "
						type="button"
						:class="{ collapsed: !sidebarOpen }"
						@click="$store.commit('sidebarOpen', !sidebarOpen)"
					>
						<span class="icon-bar top-bar"></span>
						<span class="icon-bar middle-bar"></span>
						<span class="icon-bar bottom-bar"></span>
					</button>
				</div>
				<span class="navbar-brand">{{ title }}</span>
			</div>
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navigation"
				aria-controls="navigation-index"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-bar navbar-kebab"></span>
				<span class="navbar-toggler-bar navbar-kebab"></span>
				<span class="navbar-toggler-bar navbar-kebab"></span>
			</button>
			<div class="collapse navbar-collapse justify-content-end" id="navigation">
				<Search class="d-lg-block d-sm-none" />
				<ul class="navbar-nav text-center">
					<li class="nav-item d-lg-none d-sm-block">
						<router-link
							to="/libary"
							tag="button"
							class="btn-collapse btn px-5 btn-outline-success my-0 rounded"
							>Bibliotheek</router-link
						>
					</li>
					<hr />
					<li class="nav-item d-lg-none d-sm-block">
						<router-link tag="a" class="nav-link" to="/dashboard"
							>Dashboard</router-link
						>
					</li>
					<li class="nav-item d-lg-none d-sm-block">
						<router-link tag="a" class="nav-link" to="/dashboard/materials"
							>Materialen</router-link
						>
					</li>
					<li class="nav-item d-lg-none d-sm-block">
						<router-link tag="a" class="nav-link" to="/dashboard/reservations"
							>Reserveringen</router-link
						>
					</li>
					<li class="nav-item d-lg-none d-sm-block">
						<router-link tag="a" class="nav-link" to="/dashboard/users"
							>Gebruikers</router-link
						>
					</li>
					<hr />
					<li class="nav-item d-lg-none d-sm-block">
						<router-link tag="a" class="nav-link" to="/profile"
							>Profiel</router-link
						>
					</li>
					<li class="nav-item d-lg-none d-sm-block text-danger">
						<a class="nav-link text-danger" href="#" @click="logout"
							>Uitloggen</a
						>
					</li>
					<li class="nav-item btn-rotate dropdown d-none d-lg-block">
						<a
							class="nav-link dropdown-toggle"
							id="dropDownMenu"
							data-bs-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false"
						>
							<i class="fas fa-cog"></i>
						</a>
						<div
							class="dropdown-menu dropdown-menu-right bg-light"
							aria-labelledby="dropDownMenu"
						>
							<router-link class="dropdown-item" to="/profile"
								>Profiel</router-link
							>
							<a class="dropdown-item text-danger" href="#" @click="logout"
								>Uitloggen</a
							>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>
	import Search from "@/components/Search.vue";
	import { mapGetters } from "vuex";

	export default {
		props: ["title"],
		components: { Search },
		computed: {
			...mapGetters(["sidebarOpen"])
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
	#navbar.navbar-transparent {
		background-color: #f4f3ef !important;
	}

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
</style>
