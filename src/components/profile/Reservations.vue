<template>
	<div class="col-md-6" v-if="materials && userReservations">
		<div class="card">
			<div class="card-header">
				<h4 class="card-title">Reserveringen</h4>
			</div>
			<div class="card-body">
				<ul class="list-unstyled">
					<li class="my-2 border-bottom" v-for="reservation of userReservations" :key="reservation.id">
						<div class="row">
							<div class="col-md-2 col-2 pr-0">
								<div class>
									<img
										v-if="materialById(reservation.id).images[0]"
										:src="materialById(reservation.id).images[0].url"
										class="preview_image img-circle img-no-padding img-responsive"
									/>
									<img v-else class="preview_image img-circle img-no-padding img-responsive" />
								</div>
							</div>
							<div class="col-md-7 col-7">
								{{materialById(reservation.id).name}}
								<br />
								<span class="text-muted">
									<small>{{reservation.amount}} {{unit(materialById(reservation.id).priceUnit)}}</small>
								</span>
							</div>
							<div class="col-md-3 col-3 text-right mt-n2">
								<td class="text-center">
									<button
										class="btn btn-sm btn-round btn-icon"
										:class="reservation.paid ? 'btn-outline-success' : 'btn-outline-danger' "
									>
										<i class="fas fa-euro-sign"></i>
									</button>
								</td>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		computed: {
			userReservations() {
				return this.$store.getters.userReservations;
			},
			materials() {
				return this.$store.getters.materials;
			}
		},
		methods: {
			materialById(id) {
				return this.materials.filter(m => m.id === id)[0];
			},
			unit(input) {
				const unit = input.split(" ")[1];
				if (unit === "deel") return "delen";
				return unit.toLowerCase();
			}
		},
		mounted() {
			this.$store.dispatch("getUserReservations");
		}
	};
</script>

<style lang="scss" scoped>
	.preview_image {
		width: 35px;
		height: 35px;
		background: url("../../assets/img/noImage.jpg");

		background-repeat: no-repeat !important;
		background-size: cover !important;
		border: black solid 1px;
		border-radius: 50%;
	}
</style>

