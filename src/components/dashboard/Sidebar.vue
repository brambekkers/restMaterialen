<template>
	<div
		class="sidebar "
		:class="{ sidebarOpen: sidebarOpen }"
		data-color="white"
		data-active-color="danger"
	>
		<div class="logo text-center p-4">
			<router-link
				to="/"
				class="simple-text logo-normal"
				@click="$store.commit('sidebarOpen', !sidebarOpen)"
			>
				<img src="@/assets/img/hmc-logo.svg" alt="hmc logo" />
			</router-link>
		</div>
		<div class="sidebar-wrapper">
			<ul class="nav">
				<!-- Dashboard -->
				<li :class="$route.path === '/dashboard' ? 'active' : ''">
					<router-link
						to="/dashboard"
						@click="$store.commit('sidebarOpen', !sidebarOpen)"
					>
						<i class="fas fa-tachometer-alt"></i>
						<p>Dashboard</p>
					</router-link>
				</li>
				<!-- Materials -->
				<li>
					<a
						data-bs-toggle="collapse"
						href="#collapse-materials"
						aria-expanded="true"
						role="button"
					>
						<i class="far fa-list-alt"></i>
						<p>
							Materialen
							<b class="caret"></b>
						</p>
					</a>
					<!-- Submenu Materials -->
					<div class="collapse show" id="collapse-materials" style>
						<ul class="nav ms-5">
							<!-- Overzicht -->
							<li
								:class="$route.path === '/dashboard/materials' ? 'active' : ''"
							>
								<router-link
									to="/dashboard/materials"
									tag="a"
									@click="$store.commit('sidebarOpen', !sidebarOpen)"
								>
									<i class="fas fa-list"></i>
									<span class="sidebar-normal">Overzicht</span>
								</router-link>
							</li>
							<li
								:class="
									$route.path === '/dashboard/materials/add' ? 'active' : ''
								"
							>
								<router-link
									to="/dashboard/materials/add"
									@click="$store.commit('sidebarOpen', !sidebarOpen)"
								>
									<i class="fas fa-plus"></i>
									<span class="sidebar-normal">Voeg toe</span>
								</router-link>
							</li>
							<li
								v-if="isAdmin"
								:class="
									$route.path === '/dashboard/materials/sheetmaterials'
										? 'active'
										: ''
								"
							>
								<router-link
									to="/dashboard/materials/sheetmaterials"
									@click="$store.commit('sidebarOpen', !sidebarOpen)"
								>
									<i class="fas fa-layer-group"></i>
									<span class="sidebar-normal">Plaat opties</span>
								</router-link>
							</li>
						</ul>
					</div>
				</li>
				<!-- Reservations -->
				<li :class="$route.path === '/dashboard/reservations' ? 'active' : ''">
					<router-link
						to="/dashboard/reservations"
						@click="$store.commit('sidebarOpen', !sidebarOpen)"
					>
						<i class="fas fa-stamp"></i>
						<p>Reserveringen</p>
					</router-link>
				</li>

				<!-- Users -->
				<li v-if="isAdmin">
					<a data-bs-toggle="collapse" href="#collapse-users">
						<i class="fas fa-users"></i>
						<p>
							Gebruikers
							<b class="caret"></b>
						</p>
					</a>
					<!-- Submenu users -->
					<div class="collapse show" id="collapse-users" style>
						<ul class="nav ms-5">
							<!-- Overzicht -->
							<li :class="$route.path === '/dashboard/users' ? 'active' : ''">
								<router-link
									to="/dashboard/users"
									tag="a"
									@click="$store.commit('sidebarOpen', !sidebarOpen)"
								>
									<i class="fas fa-list"></i>
									<span class="sidebar-normal">Overzicht</span>
								</router-link>
							</li>
							<!-- Add user -->
							<li
								:class="$route.path === '/dashboard/users/add' ? 'active' : ''"
							>
								<router-link
									to="/dashboard/users/add"
									@click="$store.commit('sidebarOpen', !sidebarOpen)"
								>
									<i class="fas fa-user-plus"></i>
									<span class="sidebar-normal">Voeg toe</span>
								</router-link>
							</li>
							<!-- Add user -->
							<li
								:class="
									$route.path === '/dashboard/users/rights' ? 'active' : ''
								"
							>
								<router-link
									to="/dashboard/users/rights"
									@click="$store.commit('sidebarOpen', !sidebarOpen)"
								>
									<i class="fas fa-user-lock"></i>
									<span class="sidebar-normal">Rechten</span>
								</router-link>
							</li>
						</ul>
					</div>
				</li>
				<!-- Options -->
				<li
					v-if="isAdmin"
					:class="$route.path === '/dashboard/options' ? 'active' : ''"
				>
					<router-link to="/dashboard/options">
						<i class="fas fa-cogs"></i>
						<p>Opties</p>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";

	export default {
		computed: {
			...mapGetters(["sidebarOpen"]),
			isEditor() {
				return this.$store.getters.isEditor;
			},
			isAdmin(state) {
				return this.$store.getters.isAdmin;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.sidebarOpen {
		transform: translate(0px) !important;
	}
</style>
