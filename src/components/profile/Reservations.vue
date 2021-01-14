<template>
	<div class="col-md-6" v-if="materials && reservations">
		<div class="card">
			<div class="card-header">
				<h4 class="card-title">Reserveringen</h4>
			</div>
			<div class="card-body">
				<ul class="list-unstyled" v-if="reservations.length">
					<li
						class="my-2 border-bottom"
						v-for="reservation of reservations"
						:key="reservation.id"
					>
						<div class="row">
							<div class="col-md-2 col-2 pr-0">
								<div class>
									<img
										v-if="
											materialById(reservation.id)
												.images[0]
										"
										:src="
											materialById(reservation.id)
												.images[0].url
										"
										class="preview_image img-circle img-no-padding img-responsive"
									/>
									<img
										v-else
										class="preview_image img-circle img-no-padding img-responsive"
									/>
								</div>
							</div>
							<div class="col-md-7 col-7">
								{{ materialById(reservation.id).name }}
								<br />
								<span class="text-muted">
									<small
										>{{ reservation.amount }}
										{{
											materialById(reservation.id)
												.priceUnit
										}}</small
									>
								</span>
							</div>
							<div
								class="col-md-3 col-3 d-flex justify-content-center align-items-center"
							>
								<PaidLabel :paid="reservation.payID" />
							</div>
						</div>
					</li>
				</ul>
				<p v-else>Je hebt nog geen reserveringen</p>
				<p></p>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";

	import PaidLabel from "@/components/PaidLabel.vue";
	export default {
		props: ["user"],
		components: { PaidLabel },
		computed: {
			...mapGetters(["userReservations", "materials"]),
			uid() {
				return this.$store.getters.user.id;
			},
			reservations() {
				if (this.user.id === this.uid) {
					return this.userReservations;
				} else {
					const id = this.user.id;
					return this.materials
						.filter((m) => m.reservations && m.reservations[id])
						.map((m) => m.reservations[id]);
				}
			},
		},
		methods: {
			materialById(id) {
				return this.materials.filter((m) => m.id === id)[0];
			},
		},
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

