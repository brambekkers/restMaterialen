<template>
	<div class="wrapper">
		<Sidebar />
		<div class="main-panel h-100">
			<Navbar :title="$route.name" />
			<div class="content h-75">
				<div class="row justify-content-center" v-if="reservations.length">
					<div class="col-xxl-8 col-xxxl-5">
						<div class="card">
							<div class="card-header">
								<h4 class="card-title">Reservations in de database</h4>
							</div>
							<div class="card-body">
								<div class="row">
									<div class="col-3 ml-auto">
										<Search />
									</div>
								</div>

								<div class="card">
									<ReservationsAdmin />
								</div>
							</div>
						</div>
					</div>
				</div>
				<Loading v-else />
			</div>
			<Footer />
		</div>
	</div>
</template>

<script>
	import Navbar from "@/components/dashboard/Navbar.vue";
	import Sidebar from "@/components/dashboard/Sidebar.vue";
	import Footer from "@/components/Footer.vue";

	import Loading from "@/components/Loading.vue";
	import Search from "@/components/Search.vue";
	import ReservationsAdmin from "@/components/dashboard/reservations/ReservationsAdmin.vue";

	export default {
		name: "Reservations",
		components: { Sidebar, Navbar, Footer, Search, Loading, ReservationsAdmin },
		computed: {
			reservations() {
				return this.$store.getters.reservations;
			}
		},
		mounted() {
			setTimeout(() => {
				if (!this.reservations.length) {
					this.$store.dispatch("getReservations");
				}
			}, 500);
		}
	};
</script>
