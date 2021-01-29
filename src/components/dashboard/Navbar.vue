<template>
	<nav
		id="navbar"
		class="navbar navbar-expand-lg navbar-absolute fixed-top navbar-light bg-white border-bottom"
	>
		<div class="container-fluid">
			<div class="navbar-wrapper">
				<div class="navbar-toggle">
					<button type="button" class="navbar-toggler">
						<span class="navbar-toggler-bar bar1"></span>
						<span class="navbar-toggler-bar bar2"></span>
						<span class="navbar-toggler-bar bar3"></span>
					</button>
				</div>
				<a class="navbar-brand" href="javascript:;">{{ title }}</a>
			</div>
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-target="#navigation"
				aria-controls="navigation-index"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-bar navbar-kebab"></span>
				<span class="navbar-toggler-bar navbar-kebab"></span>
				<span class="navbar-toggler-bar navbar-kebab"></span>
			</button>
			<div
				class="collapse navbar-collapse justify-content-end"
				id="navigation"
			>
				<Search class="d-lg-block d-sm-none" />
				<ul class="navbar-nav text-center">
					<li class="nav-item d-lg-none d-sm-block">
						<router-link
							to="/dashboard"
							tag="button"
							class="btn-collapse btn btn-outline-success my-0 rounded"
							>Dashboard</router-link
						>
					</li>
					<li class="nav-item d-lg-none d-sm-block">
						<router-link tag="a" class="nav-link" to="/profile"
							>Profiel</router-link
						>
					</li>
					<li class="nav-item d-lg-none d-sm-block">
						<a class="nav-link" href="#" @click="logout"
							>Uitloggen</a
						>
					</li>
					<li class="nav-item btn-rotate dropdown d-md-block d-none">
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
							<a class="dropdown-item" href="#" @click="logout"
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

	export default {
		props: ["title"],
		components: { Search },
		methods: {
			logout() {
				this.$store.dispatch("logout");
				this.$router.push("/libary");
			},
		},
	};
</script>

<style lang="scss" scoped>
	#navbar.navbar-transparent {
		background-color: #f4f3ef !important;
	}
</style>
