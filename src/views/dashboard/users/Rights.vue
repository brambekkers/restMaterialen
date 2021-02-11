<template>
	<div class="content h-75">
		<div class="row d-flex justify-content-center" v-show="!loading">
			<!-- Editor -->
			<div class="col-sm-6 col-xl-4 col-xxl-3 col-xxxl-2">
				<div class="card mt-5">
					<div class="card-header">
						<h3 class="card-title text-center">Beheerders</h3>
					</div>
					<div class="card-body">
						<div class="form-group mb-0">
							<label>Kies gebruiker</label>
							<select
								class="form-select form-control"
								v-model="selectedEditorID"
							>
								<option selected disabled hidden>
									Choose...
								</option>
								<option
									v-for="user of users"
									:key="user.id"
									:value="user.id"
								>
									{{ user.firstName }} {{ user.lastName }}
								</option>
							</select>
						</div>
						<button
							class="btn btn-default d-block mt-3 ms-auto"
							@click="changeRole('editor', true)"
						>
							Maak beheerder
						</button>
						<table class="table table-sm tabel-hover">
							<tbody>
								<tr v-for="user of editors" :key="user.id">
									<th scope="row">
										{{ user.firstName }} {{ user.lastName }}
									</th>
									<td>
										<button
											class="close"
											aria-label="Close"
											@click="
												changeRole(
													'editor',
													false,
													user.id
												)
											"
										>
											<span aria-hidden="true"
												>&times;</span
											>
										</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<!-- admin -->
			<div class="col-sm-6 col-xl-4 col-xxl-3 col-xxxl-2">
				<div class="card mt-5">
					<div class="card-header">
						<h3 class="card-title text-center">Admins</h3>
					</div>
					<div class="card-body">
						<div class="form-group mb-0">
							<label>Kies gebruiker</label>
							<select
								class="form-select form-control"
								v-model="selectedAdminID"
							>
								<option
									v-for="user of users"
									:key="user.id"
									:value="user.id"
								>
									{{ user.firstName }} {{ user.lastName }}
								</option>
							</select>
						</div>
						<button
							class="btn btn-default d-block mt-3 ms-auto"
							@click="changeRole('admin', true)"
						>
							Maak admin
						</button>
						<table class="table table-sm tabel-hover">
							<tbody>
								<tr v-for="user of admins" :key="user.id">
									<th scope="row">
										{{ user.firstName }} {{ user.lastName }}
									</th>
									<td>
										<button
											class="btn-close float-end"
											aria-label="Close"
											@click="
												changeRole(
													'admin',
													false,
													user.id
												)
											"
										>
											<span aria-hidden="true"
												>&times;</span
											>
										</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		<Loading v-if="loading" />
	</div>
</template>

<script>
	import Loading from "@/components/Loading.vue";

	export default {
		name: "Rights",
		data() {
			return {
				loading: false,
				selectedEditorID: "",
				selectedAdminID: "",
			};
		},
		components: { Loading },

		computed: {
			currentUser() {
				return this.$store.getters.user;
			},
			users() {
				return this.$store.getters.users;
			},
			editors() {
				return this.$store.getters.editors;
			},
			admins() {
				return this.$store.getters.admins;
			},
		},
		methods: {
			async changeRole(type, bool, removeID) {
				const editor = type === "editor" && this.selectedEditorID;
				const admin = type === "admin" && this.selectedAdminID;
				const id = !bool
					? removeID
					: type === "editor"
					? this.selectedEditorID
					: this.selectedAdminID;

				// prevent from changing your own admin status
				if (this.changeOwnAdminRole(id, type, bool)) {
					return this.$store.dispatch("notification", {
						style: "error",
						msg: {
							code: "Geen toegang",
							message: "Je kunt niet je eigen admin rol aanpassen.",
						},
					});
				}

				// If nothing is selected
				if (!editor && !admin && bool) {
					return this.$store.dispatch("notification", {
						style: "warning",
						msg: {
							title: "Niets geselecteerd",
							text: "Je hebt geen gebruiker geselecteerd.",
						},
					});
				}

				try {
					await this.$store.dispatch("reauthenticateAlert");
					await this.$store.dispatch("changeRole", {
						id: id,
						admin: type === "admin" ? bool : this.isAdmin(id),
						editor: type === "editor" ? bool : this.isEditor(id),
					});
				} catch (err) {
					this.$store.dispatch("notification", {
						style: "error",
						msg: {
							code: err.code,
							message: err.message,
						},
					});
				}
			},
			changeOwnAdminRole(id, type, bool) {
				return id === this.currentUser.id && type === "admin";
			},
			isAdmin(id) {
				if (this.admins) {
					return this.admins.filter((e) => e.id === id).length > 0
						? true
						: false;
				}
				return false;
			},
			isEditor(id) {
				if (this.editors) {
					return this.editors.filter((e) => e.id === id).length > 0
						? true
						: false;
				}
				return false;
			},
		},
		mounted() {
			setTimeout(() => {
				if (!this.users.lenght) {
					this.$store.dispatch("getUsers");
				}
			}, 500);
		},
	};
</script>
