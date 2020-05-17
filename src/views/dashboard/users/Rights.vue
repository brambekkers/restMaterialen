<template>
	<div class="wrapper">
		<Sidebar />
		<div class="main-panel h-100">
			<Navbar :title="$route.name" />
			<div class="content">
				<div class="row">
					<!-- Editor -->
					<div class="col-sm-6">
						<div class="card mt-5">
							<div class="card-header">
								<h3 class="card-title text-center">Beheerders</h3>
							</div>
							<div class="card-body">
								<div class="form-group mb-0">
									<label>Kies gebruiker</label>
									<select
										class="selectpicker form-control"
										data-live-search="true"
										data-style="btn-neutral border"
										v-model="selectedEditorID"
									>
										<option selected disabled hidden>Choose...</option>
										<option
											v-for="user of users"
											:key="user.id"
											:value="user.id"
										>{{user.firstName}} {{user.lastName}}</option>
									</select>
								</div>
								<button
									class="btn btn-default d-block mt-0 ml-auto"
									@click="addRole('editor')"
								>Maak beheerder</button>
								<table class="table table-sm tabel-hover">
									<tbody>
										<tr v-for="user of editors" :key="user.id">
											<th scope="row">{{user.firstName}} {{user.lastName}}</th>
											<td>
												<button class="close" aria-label="Close" @click="removeRole('editor', user.id)">
													<span aria-hidden="true">&times;</span>
												</button>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<!-- admin -->
					<div class="col-sm-6">
						<div class="card mt-5">
							<div class="card-header">
								<h3 class="card-title text-center">Admins</h3>
							</div>
							<div class="card-body">
								<div class="form-group mb-0">
									<label>Kies gebruiker</label>
									<select
										class="selectpicker form-control"
										data-live-search="true"
										data-style="btn-neutral border"
										v-model="selectedAdminID"
									>
										<option
											v-for="user of users"
											:key="user.id"
											:value="user.id"
										>{{user.firstName}} {{user.lastName}}</option>
									</select>
								</div>
								<button class="btn btn-default d-block mt-0 ml-auto" @click="addRole('admin')">Maak admin</button>
								<table class="table table-sm tabel-hover">
									<tbody>
										<tr v-for="user of admins" :key="user.id">
											<th scope="row">{{user.firstName}} {{user.lastName}}</th>
											<td>
												<button class="close" aria-label="Close" @click="removeRole('admin', user.id)">
													<span aria-hidden="true">&times;</span>
												</button>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	</div>
</template>

<script>
	import Navbar from "@/components/dashboard/Navbar.vue";
	import Sidebar from "@/components/dashboard/Sidebar.vue";
	import Footer from "@/components/Footer.vue";

	export default {
		name: "Rights",
		data() {
			return {
				selectedEditorID: "",
				selectedAdminID: ""
			};
		},
		components: { Sidebar, Navbar, Footer },
		computed: {
			users() {
				return this.$store.getters.users;
			},
			editors() {
				if (this.users) {
					return this.users.filter(user => {
						for (const editorID of this.$store.getters.editors) {
							if (user.id === editorID) return true;
						}
					});
				}
			},
			admins() {
				if (this.users) {
					return this.users.filter(user => {
						for (const adminID of this.$store.getters.admins) {
							if (user.id === adminID) return true;
						}
					});
				}
			}
		},
		methods: {
			addRole(type) {
				const editor = type === "editor" && this.selectedEditorID;
				const admin = type === "admin" && this.selectedAdminID;

				if (editor || admin) {
					this.$store.dispatch("addRole", {
						type,
						id:
							type === "editor"
								? this.selectedEditorID
								: this.selectedAdminID
					});
				}
			},
			removeRole(type, id) {
				this.$store.dispatch("removeRole", {
					type,
					id
				});
			}
		},
		mounted() {
			this.$store.dispatch("getUsers");
			this.$store.dispatch("getRoles");
		},
		updated() {
			// Settimeout becouse <options> have to load firstin Vue template
			setTimeout(() => {
				$(".selectpicker").selectpicker();
			}, 500);
		}
	};
</script>
