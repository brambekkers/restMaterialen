<template>
	<div class="table-responsive-md">
		<table class="table table-striped">
			<thead class="text-primary">
				<tr>
					<th>ID</th>
					<th>Email</th>
					<th>Naam</th>
					<th class="text-end">Acties</th>
				</tr>
			</thead>
			<tbody>
				<User v-for="(user, id) in users" :key="id" :user="user" />
			</tbody>
		</table>
	</div>
</template>

<script>
	import User from "@/components/dashboard/users/User.vue";

	export default {
		name: "Userlist",
		components: { User },
		computed: {
			users() {
				return this.$store.getters.users;
			},
		},
	};
</script>
