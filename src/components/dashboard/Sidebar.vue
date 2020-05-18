<template>
	<div class="sidebar" data-color="white" data-active-color="danger">
		<div class="logo text-center">
			<router-link to="/" class="simple-text logo-normal">RMM</router-link>
		</div>
		<div class="sidebar-wrapper">
			<ul class="nav">
				<!-- Dashboard -->
				<li :class="$route.path === '/dashboard' ? 'active' : ''">
					<router-link to="/dashboard">
						<i class="fas fa-tachometer-alt"></i>
						<p>Dashboard</p>
					</router-link>
				</li>
				<!-- Materials -->
				<li>
					<a data-toggle="collapse" href="#collapse-materials" aria-expanded="true">
						<i class="far fa-list-alt"></i>
						<p>
							Materialen
							<b class="caret"></b>
						</p>
					</a>
					<!-- Submenu Materials -->
					<div class="collapse show" id="collapse-materials" style>
						<ul class="nav ml-5">
							<!-- Overzicht -->
							<li :class=" $route.path === '/dashboard/materials' ? 'active' : '' ">
								<router-link to="/dashboard/materials" tag="a">
									<i class="fas fa-list"></i>
									<span class="sidebar-normal">Overzicht</span>
								</router-link>
							</li>
							<li :class=" $route.path === '/dashboard/materials/add' ? 'active' : '' ">
								<router-link to="/dashboard/materials/add">
									<i class="fas fa-plus"></i>
									<span class="sidebar-normal">Voeg toe</span>
								</router-link>
							</li>
						</ul>
					</div>
				</li>
				<!-- Reservations -->
				<li
					:class="
                        $route.path === '/dashboard/reservations'
                            ? 'active'
                            : ''
                    "
				>
					<router-link to="/dashboard/reservations">
						<i class="fas fa-stamp"></i>
						<p>Reserveringen</p>
					</router-link>
				</li>
				<!-- Users -->
				<li v-if="isAdmin">
					<a data-toggle="collapse" href="#collapse-users">
						<i class="fas fa-users"></i>
						<p>
							Gebruikers
							<b class="caret"></b>
						</p>
					</a>
					<!-- Submenu users -->
					<div class="collapse" id="collapse-users" style>
						<ul class="nav ml-5">
							<!-- Overzicht -->
							<li :class=" $route.path === '/dashboard/users' ? 'active' : '' ">
								<router-link to="/dashboard/users" tag="a">
									<i class="fas fa-list"></i>
									<span class="sidebar-normal">Overzicht</span>
								</router-link>
							</li>
							<!-- Add user -->
							<li :class=" $route.path === '/dashboard/users/add' ? 'active' : '' ">
								<router-link to="/dashboard/users/add">
									<i class="fas fa-user-plus"></i>
									<span class="sidebar-normal">Voeg toe</span>
								</router-link>
							</li>
							<!-- Add user -->
							<li :class=" $route.path === '/dashboard/users/rights' ? 'active' : '' ">
								<router-link to="/dashboard/users/rights">
									<i class="fas fa-user-lock"></i>
									<span class="sidebar-normal">Rechten</span>
								</router-link>
							</li>
						</ul>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		computed: {
			isEditor(state) {
				return state.user && state.user.role === "editor";
			},
			isAdmin(state) {
				return state.user && state.user.role === "admin";
			}
		}
	};
</script>
