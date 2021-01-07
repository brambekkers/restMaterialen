<template>
	<div class="main-content" :class="{ 'mt-5': UID }">
		<div class="container">
			<div class="row pt-5" v-if="profile">
				<User :user="profile" />
				<Reservations :user="profile" />
				<UserDetails :user="profile" />
			</div>
			<button class="btn btn-default" @click="$router.go(-1)" v-if="UID">
				Terug
			</button>
			<button
				class="btn btn-danger"
				@click.prevent="deleteButton()"
				v-if="!UID"
			>
				Verwijder account
			</button>
			<button
				class="btn btn-default float-right"
				@click.prevent="updateButton()"
				v-if="!UID"
			>
				Update account
			</button>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from "vuex";

	import User from "@/components/profile/User.vue";
	import UserDetails from "@/components/profile/UserDetails.vue";
	import Reservations from "@/components/profile/Reservations.vue";

	export default {
		name: "Profile",
		components: { User, UserDetails, Reservations },
		computed: {
			...mapGetters(["user", "users"]),
			UID() {
				return this.$route.params.uid;
			},
			profile() {
				return !this.UID
					? this.user
					: this.users.filter((user) => user.id === this.UID)[0];
			},
		},
		methods: {
			...mapActions([
				"reauthenticateAlert",
				"alert",
				"notification",
				"updateUser",
				"deleteUser",
			]),
			async deleteButton() {
				try {
					await this.alert({
						type: "confirm",
						msg: {
							title: "Account verwijderen?",
							text:
								"Weet je zeker dat je dit account wilt verwijderen? Wanneer je dit account verwijderd verlies je al de data en dit kan niet meer ongedaan worden gemaakt.",
						},
					});
					this.removeUser();
				} catch (error) {
					// Do nothing
				}
			},
			async updateButton() {
				try {
					// TODO: Make alert
					await this.updateUser(this.user);

					// onComplete:
					this.notification({
						style: "success",
						msg: {
							title: "Succesvol geupdate",
							text: "Je account is succesvol geupdate.",
						},
					});
				} catch (err) {
					this.notification({
						style: "error",
						msg: err,
					});
				}
			},
			async removeUser() {
				try {
					await this.deleteUser(this.user.id);
					// onComplete:
					await this.notification({
						style: "success",
						msg: {
							title: "Succesvol verwijderd",
							text:
								"Je account is succesvol verwijderd. Als jouw data is verwijderd en je kunt vanaf nu niet meer inloggen.",
						},
					});
					this.$router.push("/libary");
				} catch (err) {
					this.notification({
						style: "error",
						msg: err,
					});
				}
			},
		},
	};
</script>
