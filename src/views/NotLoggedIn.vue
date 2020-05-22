<template>
	<div>
		<Navbar />
		<div class="login">
			<div class="background"></div>
			<div class="card card-login px-5">
				<h3 class="title text-center">Niet ingelogd </h3>
				<p>Je probeert een pagina te berijken waar je ingelogd voor moet zijn. </p>
				<router-link
					class="text-danger text-center"
					to="/login"
				> Klik hier om je in te loggen</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
	components: { Navbar },
	watch: {
		user() {
			this.$router.push("/profile");
		}
	},
	computed: {
		user() {
			return this.$store.getters.user;
		}
	}
};
</script>

<style lang="scss" scoped>
	.login {
		position: relative;
		display: flex;
		width: 100vw;
		height: calc(100vh - 62px);
		justify-content: center;
		align-items: center;

		.background {
			position: absolute;
			opacity: 0.5;
			z-index: 1;
			width: 100%;
			height: 100%;
			background: url("../assets/img/background.jpg");
			background-repeat: no-repeat;
			background-size: cover;
		}

		.card-login {
			z-index: 2;
			box-shadow: 0 25px 30px -13px rgba(40, 40, 40, 0.4);
			border-radius: 6px;
			padding-top: 25px;
			padding-bottom: 25px;
			min-width: 350px;
		}
	}
</style>