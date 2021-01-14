<template>
	<div class="col-md-6">
		<div class="card card-user">
			<div class="image">
				<img src="@/assets/img/background.jpg" alt="..." />
			</div>
			<div class="author">
				<a href="#">
					<img
						class="avatar border-gray"
						src="@/assets/img/noImage.jpg"
						alt="..."
					/>
					<h5 class="title">
						{{ user.firstName }} {{ user.lastName }}
					</h5>
				</a>
			</div>
			<div class="card-footer">
				<hr />
				<div class="button-container">
					<div class="row">
						<div class="col-6 ms-auto">
							<h5>
								{{ unpaidUserReservations }}
								<br />
								<small>Reserveringen</small>
							</h5>
						</div>
						<div class="col-6 ms-auto me-auto">
							<h5>
								{{ paidUserReservations }}
								<br />
								<small>Aankopen</small>
							</h5>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ["user"],
		computed: {
			userReservations() {
				return this.$store.getters.userReservations;
			},
			unpaidUserReservations() {
				if (this.userReservations) {
					return this.userReservations.filter((r) => !r.payID).length;
				}
				return 0;
			},
			paidUserReservations() {
				if (this.userReservations) {
					return this.userReservations.filter((r) => r.payID).length;
				}
				return 0;
			},
		},
	};
</script>
