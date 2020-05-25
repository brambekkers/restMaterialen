<template>
	<tr
		class="item"
		@click="toItem"
	>
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
			>
				<i class="fa fa-times"></i>
			</button>
		</td>
	</tr>
</template>

<script>
export default {
	props: ["user"],
	methods: {
		toItem() {
			this.$router.push(`${this.$route.fullPath}/${this.user.id}`);
		}
	},
	mounted() {
		$(() => {
			$('[data-toggle="tooltip"]').tooltip();
		});
	}
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
