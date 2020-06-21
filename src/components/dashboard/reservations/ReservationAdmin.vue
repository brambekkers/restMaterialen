<template>
	<tr>
		<td class="pl-4">{{ index + 1 }}</td>
		<td>{{ reservation.uid }}</td>
		<td>{{ reservation.amount }} {{ material.unit }}</td>
		<td>{{ reservation.amount * material.price }} euro</td>
		<td class="text-center">
			<button
				class="btn btn-sm btn-round btn-icon"
				:class="reservation.payID ? 'btn-outline-success' : 'btn-outline-danger'"
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
				@click.stop="paymentButton()"
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
	watch: {
		reservation: {
			immediate: true,
			deep: true,
			async handler() {
				if (this.reservation.payID) {
					try {
						const paymentExist = await this.$store.dispatch(
							"checkIfPaymentExist",
							this.reservation.payID
						);
						if (!paymentExist) {
							this.$store.dispatch("removePayment", this.reservation);
						}
					} catch (error) {}
				}
			}
		}
	},
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
			} catch (err) {
				this.$store.dispatch("notification", {
					style: "error",
					msg: err
				});
			}
		},
		async paymentButton() {
			try {
				await this.$store.dispatch("alert", {
					type: "confirm",
					msg: {
						title: "Betaling aanpassen",
						text: `Weet je zeker dat je de betaling wilt aanpassen naar: <strong> ${
							this.reservation.payID ? "" : "niet"
						} betaald.</strong>`
					}
				});
				this.togglePayment();
			} catch (err) {
				this.$store.dispatch("notification", {
					style: "error",
					msg: err
				});
			}
		},
		async togglePayment() {
			try {
				this.reservation.payID
					? await this.$store.dispatch("removePayment", this.reservation)
					: await this.$store.dispatch("registerPayment", this.reservation);

				// onComplete:
				this.$store.dispatch("notification", {
					style: "success",
					msg: {
						title: "Betaling aangepast!",
						text: `Je hebt succesvol de betaling aangepast. De reservering is <strong> ${
							this.reservation.payID ? "" : "niet"
						} betaald.</strong>`
					}
				});
			} catch (error) {}
		},
		async removeReservation() {
			try {
				await this.$store.dispatch("removeReservation", this.reservation);
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
	updated() {
		$('[data-toggle="tooltip"]').tooltip();
	}
};
</script>
