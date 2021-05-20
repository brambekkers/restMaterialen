<template>
	<div class="col-sm-6 col-xl-3">
		<div class="card card-stats">
			<div class="card-body">
				<div class="row">
					<div class="col-5 col-md-4">
						<div class="icon-big text-center">
							<i class="fas fa-cash-register text-success"></i>
						</div>
					</div>
					<div class="col-7 col-md-8">
						<div class="numbers">
							<p class="card-category">Totale opbrengst</p>
							<p class="card-title">€ {{ totalPayments.toFixed(2) }}</p>
						</div>
					</div>
				</div>
			</div>
			<div class="card-footer">
				<hr />
				<div class="stats">
					<i class="fa fa-calculator"></i>
					{{ payments.length }}
					betalingen
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	computed: {
		...mapGetters(["payments"]),
		totalPayments() {
			return this.payments.reduce((a, b) => a + b.price, 0);
		},
	},
};
</script>
