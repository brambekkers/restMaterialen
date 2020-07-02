<template>
	<div class="content h-75">
		<div class="row justify-content-center">
			<div class="col-xxl-8 col-xxxl-5">
				<div class="card">
					<div class="card-header d-flex">
						<h4 class="card-title mb-0">Programmaopties</h4>
						<Information :info="info" />
					</div>
					<div class="card-body">
						<label class="h6">Reserveringsdagen</label>
						<div class="row">
							<label
								class="col-sm-10 col-lg-7 col-form-label"
							>Het aantal dagen dat een reserving onbetaald blijft bestaan. De reservering wordt definietief wanneer deze is betaald</label>
							<div class="col-sm-3 col-md-2 col-xl-1 ml-auto">
								<div class="form-group">
									<input
										v-model.number="reservationOptions.reservationExpireDays"
										type="number"
										class="form-control"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<button class="btn float-right" @click="updateOptions()">Update</button>
			</div>
		</div>
	</div>
</template>

<script>
	import Information from "@/components/Information";

	export default {
		name: "Options",
		components: { Information },
		data() {
			return {
				info: {
					title: "Programmaopties",
					msg: `
								<div class="text-left">
								In het programmaopties menu zijn diverse technische instellingen te vinden voor het programma. Dit zijn algemene instellingen en gelden voor <b>alle gebruikers</b>.<br><br> 

								<h6 class="mb-0">Reserveringsdagen</h6>
								De optie reserveringsdagen is gemaakt om het aantal dagen dat een reserving onbetaald open blijft bestaan te beperken. Door een aantal dagen 
								in te stellen komt het materiaal nadat de tijd is verlopen automatisch weer op beschikbaar te staan. De reservering wordt definietief wanneer deze is betaald en door een beheerder is geaccrediteerd.<br><br>

								</div>`
				}
			};
		},
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
