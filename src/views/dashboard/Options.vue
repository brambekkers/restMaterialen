<template>
	<div class="content h-75">
		<div class="row justify-content-center">
			<div class="col-xxl-8 col-xxxl-5">
				<div class="card">
					<div class="card-header">
						<h4 class="card-title">Programmaopties</h4>
					</div>
					<div class="card-body">
						<label class="h6">Reserveringsdagen</label>
						<div class="row">
							<label class="col-sm-10 col-lg-7 col-form-label">Het aantal dagen dat een reserving onbetaald blijft bestaan. De reservering wordt definietief wanneer deze is betaald </label>
							<div class="col-sm-3 col-md-2 col-xl-1 ml-auto">
								<div class="form-group">
									<input
										v-model.number="reservationOptions.reservationExpireDays"
										type="number"
										class="form-control"
									>
								</div>
							</div>
						</div>

						<button
							class="btn float-right"
							@click="updateOptions()"
						>Update</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Options",
	computed: {
		reservationOptions() {
			return this.$store.getters.reservationOptions;
		}
	},
	methods: {
		async updateOptions() {
			this.$store.dispatch("updateOptions", {
				type: "reservation",
				options: this.reservationOptions
			});
		}
	}
};
</script>
