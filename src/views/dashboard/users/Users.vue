<template>
	<div class="content h-75">
		<div
			class="row justify-content-center"
			v-if="users && Object.values(users).length"
		>
			<div class="col-xxl-8 col-xxxl-5">
				<div class="card">
					<div class="card-header">
						<h4 class="card-title">Users in de database</h4>
					</div>
					<div class="card-body">
						<div class="row">
							<div class="col-3 ms-auto">
								<Search />
							</div>
						</div>

						<div class="card border">
							<Userlist />
						</div>
					</div>
				</div>
			</div>
		</div>
		<Loading v-else />
	</div>
</template>

<script>
	import Userlist from "@/components/dashboard/users/UserList.vue";
	import Loading from "@/components/Loading.vue";
	import Search from "@/components/Search.vue";

	export default {
		name: "Users",
		components: { Userlist, Search, Loading },
		computed: {
			users() {
				return this.$store.getters.users;
			},
		},
		mounted() {
			setTimeout(() => {
				if (!this.users.length) {
					this.$store.dispatch("getUsers");
				}
			}, 500);
		},
	};
</script>
