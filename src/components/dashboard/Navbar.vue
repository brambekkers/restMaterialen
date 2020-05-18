<template>
	<nav class="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent">
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
				data-toggle="collapse"
				data-target="#navigation"
				aria-controls="navigation-index"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-bar navbar-kebab"></span>
				<span class="navbar-toggler-bar navbar-kebab"></span>
				<span class="navbar-toggler-bar navbar-kebab"></span>
			</button>
			<div class="collapse navbar-collapse justify-content-end" id="navigation">
				<Search />
				<ul class="navbar-nav">
					<li class="nav-item btn-rotate dropdown">
						<a
							class="nav-link dropdown-toggle"
							id="dropDownMenu"
							data-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false"
						>
							<i class="fas fa-cog"></i>
							<p>
								<span class="d-lg-none d-md-block">Some Actions</span>
							</p>
						</a>
						<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropDownMenu">
							<router-link class="dropdown-item" to="/profile">Profile</router-link>
							<a class="dropdown-item" href="#" @click="logout">Logout</a>
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
			}
		}
	};
</script>
