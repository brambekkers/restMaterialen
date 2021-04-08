<template>
	<section
		class="container text-center bg-white p-5 mb-4 border-bottom d-flex flex-column align-items-center justify-content-center"
	>
		<h1 class="fw-bolder mb-3">HMC CircuStek</h1>
		<p class="lead text-muted">
			In de circulaire winkel van het HMC kan je verschillden materialen
			reserveren die zijn geleverd door bedrijven uit de regio. als je je
			materiaal hebt besteld blijft dit 5 dagen gereserveerd, zorg ervoor
			dat je binnnen deze tijd je materiaal afrekend in de regulieren
			winkel en ophaald om mee aan de slag te gaan. Als je meer interrese
			hebt naar deze bedrijven die hiervoor hebben gezogt kan je deze
			terug in de restmaterialen database.
		</p>
		<router-link v-if="user" to="/profile" class="btn btn-primary my-2"
			>Mijn reserveringen</router-link
		>
	</section>
</template>

<script>
	import { mapGetters } from "vuex";

	export default {
		computed: {
			...mapGetters(["user"]),
		},
	};
</script>

<style lang="scss" scoped>
	.container {
		min-height: 300px;
		width: 100vw;
		max-width: 100vw;

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