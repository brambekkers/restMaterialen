<template>
	<tr class="item">
		<td>{{ user.id }}</td>
		<td>{{ user.email }}</td>
		<td>{{ user.firstName }} {{ user.lastName }}</td>
		<td class="td-actions text-right">
			<button
				type="button"
				rel="tooltip"
				class="btn btn-info btn-sm btn-icon mx-1"
				data-toggle="tooltip"
				data-placement="top"
				title="Bekijk gebruiker"
				@click="toItem"
			>
				<i class="fa fa-user"></i>
			</button>
			<button
				type="button"
				rel="tooltip"
				class="btn btn-warning btn-sm btn-icon mx-1"
				data-toggle="tooltip"
				data-placement="top"
				title="Reset wachtwoord gebruiker"
			>
				<i class="fas fa-unlock-alt"></i>
			</button>
			<button
				type="button"
				rel="tooltip"
				class="btn btn-danger btn-sm btn-icon mx-1"
				data-toggle="tooltip"
				data-placement="top"
				title="Verwijder gebruiker"
				@click="deleteUser"
			>
				<i class="fa fa-times"></i>
			</button>
		</td>
	</tr>
</template>

<script>
	export default {
		props: ["user"],
		computed: {
			uid() {
				return this.$store.getters.user.id;
			},
		},
		methods: {
			toItem() {
				this.$router.push(
					`${this.$route.fullPath}/details/${this.user.id}`
				);
			},
			async deleteUser() {
				if (this.user.id === this.uid) {
					this.$store.dispatch("alert", {
						type: "warning",
						msg: {
							title: "Dit kan niet",
							text: "Je kunt je eigen account niet verwijderen",
						},
					});
					return;
				}
				try {
					await this.$store.dispatch("alert", {
						type: "confirm",
						msg: {
							title: "Gebruiker verwijderen?",
							text:
								"Weet je zeker dat je deze gebruiker wilt verwijderen? Wanneer je deze gebruiker verwijderd kan dit niet meer ongedaan worden gemaakt.",
						},
					});
					this.$store.dispatch("deleteUserAsAdmin", this.user.id);
				} catch (err) {
					this.$store.dispatch("notification", {
						style: "error",
						msg: err,
					});
				}
			},
		},
		mounted() {
			$(() => {
				$('[data-toggle="tooltip"]').tooltip();
			});
		},
	};
</script>

<style lang="scss" scoped>
	.item {
		cursor: pointer;
		&:hover {
			background: #f4f3ef;
		}
	}
</style>
