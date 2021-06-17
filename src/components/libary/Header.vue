<template>
	<section
		class="container text-center bg-white p-2 p-md-3 p-xl-5 mb-2  mb-lg-4 border-bottom d-flex flex-column align-items-center justify-content-center"
	>
		<h1 class="title fw-bolder mb-3 mt-2">HMC CircuStek</h1>
		<p class="lead text-muted">
			In de circulaire winkel van het HMC kun je verschillende materialen
			reserveren die door regionale bedrijven zijn geleverd. Besteld materiaal
			blijft {{ reservationExpireDays }} dagen gereserveerd. Zorg ervoor dat je
			binnen deze {{ reservationExpireDays }} dagen het materiaal afrekent en
			ophaalt in de reguliere winkel. Als je interesse hebt in de bedrijven die
			het materiaal leveren, kun je dit terug lezen in de database.
		</p>
		<router-link
			v-if="user"
			to="/profile"
			class="btn btn-primary my-2 d-none d-lg-block"
			>Mijn reserveringen</router-link
		>
	</section>
</template>

<script>
	import { mapGetters } from "vuex";

	export default {
		computed: {
			...mapGetters(["user", "reservationExpireDays"])
		}
	};
</script>

<style lang="scss" scoped>
	.container {
		// min-height: 300px;
		width: 100vw;
		max-width: 100vw;

		.title {
			font-size: calc(2.3vw + 1.7rem);
		}
		.lead {
			display: flex;
			flex-direction: column;
			max-width: 1300px;

			font-size: 1rem;

			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
