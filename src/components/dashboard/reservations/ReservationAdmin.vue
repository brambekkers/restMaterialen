<template>
	<tr>
		<td class="pl-4">{{index+1}}</td>
		<td>{{reservation.uid}}</td>
		<td>{{reservation.amount}} {{material.unit}}</td>
		<td class="text-center">
			<button
				class="btn btn-sm btn-round btn-icon"
				:class="reservation.paid ? 'btn-outline-success' : 'btn-outline-danger' "
			>
				<i class="fas fa-euro-sign"></i>
			</button>
		</td>
		<td class="text-right">
			<button
				type="button"
				rel="tooltip"
				data-toggle="tooltip"
				data-placement="top"
				title="Pas betaling aan"
				class="btn btn-info btn-sm btn-icon mx-1"
			>
				<i class="fas fa-euro-sign"></i>
			</button>
			<button
				type="button"
				rel="tooltip"
				data-toggle="tooltip"
				data-placement="top"
				title="Verwijder reservering"
				class="btn btn-danger btn-sm btn-icon mx-1"
				@click.stop="deleteButton()"
			>
				<i class="fa fa-times"></i>
			</button>
		</td>
	</tr>
</template>

<script>
	export default {
		props: ["material", "reservation", "index"],
		methods: {
			async deleteButton() {
				try {
					await this.$store.dispatch("alert", {
						type: "confirm",
						msg: {
							title: "Reservering verwijderen?",
							text:
								"Weet je zeker dat je deze reservering wilt verwijderen? Wanneer je deze reserving verwijderd verlies je al de data en dit kan niet meer ongedaan worden gemaakt."
						}
					});
					this.removeReservation();
				} catch (error) {
					// Do nothing
				}
			},
			async removeReservation() {
				try {
					await this.$store.dispatch(
						"removeReservation",
						this.reservation
					);
					// onComplete:
					this.$store.dispatch("notification", {
						style: "success",
						msg: {
							title: "Verwijderd!",
							text: "De reservering is succesvol verwijderd!"
						}
					});
				} catch (err) {
					this.$store.dispatch("notification", {
						style: "error",
						msg: err
					});
				}
			}
		},
		mounted() {
			$('[data-toggle="tooltip"]').tooltip();
		}
	};
</script>