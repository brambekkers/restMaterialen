<template>
	<div>
		<Navbar />
		<div class="main-content">
			<div class="container">
				<div class="row">
					<div class="col-md-12 mt-5">
						<Info :material="material" />
					</div>
				</div>
				<div class="row" v-if="isEditor">
					<div class="col-md-4">
						<Admin :material="material" />
					</div>
					<div class="col-md-8">
						<Reservations :material="material" />
					</div>
				</div>
				<div class="row">
					<div class="col-md-6">
						<Images :material="material" />
					</div>
					<div class="col-md-6">
						<Labels :material="material" />
					</div>
				</div>
				<div class="d-flex justify-content-between">
					<router-link tag="button" to="/libary" class="btn btn-default">
						<i class="fas fa-arrow-circle-left mr-3"></i>Terug
					</router-link>

					<router-link
						:to="`/reservation/${$route.params.id}`"
						tag="button"
						class="btn btn-info"
						v-if="user"
					>
						Reserveer
						<i class="fas fa-pencil-alt ml-3"></i>
					</router-link>
				</div>
			</div>
		</div>
		<Footer />
	</div>
</template>

<script>
	import Navbar from "@/components/Navbar.vue";
	import Footer from "@/components/Footer.vue";

	import Info from "@/components/libary/details/Info.vue";
	import Images from "@/components/libary/details/Images.vue";
	import Labels from "@/components/libary/details/Labels.vue";
	import Admin from "@/components/libary/details/Admin.vue";
	import Reservations from "@/components/libary/details/Reservations.vue";

	export default {
		name: "Detail",
		components: {
			Navbar,
			Footer,
			Info,
			Images,
			Labels,
			Admin,
			Reservations
		},
		computed: {
			user() {
				return this.$store.getters.user;
			},
			isEditor() {
				return this.$store.getters.isEditor;
			},
			materials() {
				return this.$store.getters.materials;
			},

			material() {
				if (this.materials) {
					const id = this.$route.params.id;
					return this.materials.filter(item => item.id === id)[0];
				}
			}
		}
	};
</script>

<style lang="scss" scoped></style>
