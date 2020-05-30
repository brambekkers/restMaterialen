<template>
	<div>
		<Navbar />
		<div class="main-content">
			<div class="container">
				<div class="row mt-5" v-if="user">
					<User :user="user" />
					<Reservations />
					<UserDetails :user="user" />
				</div>
			</div>
		</div>
		<Footer />
	</div>
</template>

<script>
	import Navbar from "@/components/Navbar.vue";
	import Footer from "@/components/Footer.vue";

	import User from "@/components/profile/User.vue";
	import UserDetails from "@/components/profile/UserDetails.vue";
	import Reservations from "@/components/profile/Reservations.vue";

	export default {
		name: "Profile",
		components: { Navbar, Footer, User, UserDetails, Reservations },
		computed: {
			user() {
				return this.$store.getters.user;
			}
		},
		methods: {
			async deleteButton() {
				try {
					await this.$store.dispatch("alert", {
						type: "confirm",
						msg: {
							title: "Account verwijderen?",
							text:
								"Weet je zeker dat je dit account wilt verwijderen? Wanneer je dit account verwijderd verlies je al de data en dit kan niet meer ongedaan worden gemaakt."
						}
					});
					this.deleteUser();
				} catch (error) {
					// Do nothing
				}
			},
			async deleteUser() {
				try {
					// TODO: Make alert
					await this.$store.dispatch("deleteUser", this.user.id);

					// onComplete:
					this.$store.dispatch("notification", {
						style: "success",
						msg: {
							title: "Succesvol verwijderd",
							text:
								"Je account is succesvol verwijderd. Als jouw data is verwijderd en je kunt vanaf nu niet meer inloggen."
						}
					});
				} catch (err) {
					this.$store.dispatch("notification", {
						style: "error",
						msg: err
					});
				}
			}
		}
	};
</script>
