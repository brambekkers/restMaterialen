<template>
	<div class="content h-75">
		<div class="row" v-show="isLoaded">
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
								>{{ user.firstName }} {{ user.lastName }}</option>
							</select>
						</div>
						<button
							class="btn btn-default d-block mt-0 ml-auto"
							@click="changeRole('editor', true)"
						>Maak beheerder</button>
						<table class="table table-sm tabel-hover">
							<tbody>
								<tr v-for="user of editors" :key="user.id">
									<th scope="row">{{ user.firstName }} {{ user.lastName }}</th>
									<td>
										<button class="close" aria-label="Close" @click="changeRole('editor', false, user.id)">
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
								>{{ user.firstName }} {{ user.lastName }}</option>
							</select>
						</div>
						<button
							class="btn btn-default d-block mt-0 ml-auto"
							@click="changeRole('admin', true)"
						>Maak admin</button>
						<table class="table table-sm tabel-hover">
							<tbody>
								<tr v-for="user of admins" :key="user.id">
									<th scope="row">{{ user.firstName }} {{ user.lastName }}</th>
									<td>
										<button class="close" aria-label="Close" @click="changeRole('admin', false, user.id)">
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
		<button
			class="btn btn-danger"
			@click="$store.dispatch('TESTROLE', {id: 'Bl6HbmhKOmZszrHyoJAU90jpGol1', admin: true, editor: false})"
		>TEST</button>
		<Loading v-if="!isLoaded" />
	</div>
</template>

<script>
	import Loading from "@/components/Loading.vue";

	export default {
		name: "Rights",
		data() {
			return {
				selectedEditorID: "",
				selectedAdminID: ""
			};
		},
		components: { Loading },
		computed: {
			currentUser() {
				return this.$store.getters.user;
			},
			isLoaded() {
				if (
					this.users.length &&
					this.editors.length &&
					this.admins.length
				) {
					$(".selectpicker").selectpicker();
					return true;
				} else {
					return true;
				}
			},
			users() {
				return this.$store.getters.users;
			},
			editors() {
				return this.$store.getters.editors;
			},
			admins() {
				return this.$store.getters.admins;
			}
		},
		methods: {
			changeRole(type, bool, removeID) {
				const editor = type === "editor" && this.selectedEditorID;
				const admin = type === "admin" && this.selectedAdminID;
				const id = !bool
					? removeID
					: type === "editor"
					? this.selectedEditorID
					: this.selectedAdminID;

				// prevent from changing your own admin status
				if (this.changeOwnAdminRole(id, type, bool)) {
					return console.log("You cant change your own admin role");
				}

				if (!editor && !admin && bool) {
					return console.log("Nothing selected");
				}

				this.$store.dispatch("changeRole", {
					id: id,
					admin: type === "admin" ? bool : this.isAdmin(id),
					editor: type === "editor" ? bool : this.isEditor(id)
				});
			},
			changeOwnAdminRole(id, type, bool) {
				return id === this.currentUser.id && type === "admin";
			},
			isAdmin(id) {
				if (this.admins) {
					return this.admins.filter(e => e.id === id).length > 0
						? true
						: false;
				}
				return false;
			},
			isEditor(id) {
				if (this.editors) {
					return this.editors.filter(e => e.id === id).length > 0
						? true
						: false;
				}
				return false;
			}
			// removeRole(type, id) {
			// 	this.$store.dispatch("removeRole", {
			// 		type,
			// 		id
			// 	});
			// }
		},
		mounted() {
			setTimeout(() => {
				if (!this.users || !this.users.lenght) {
					this.$store.dispatch("getUsers");
					// this.$store.dispatch("getRoles");
				}
			}, 500);
		}
	};
</script>
