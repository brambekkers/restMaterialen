<template>
	<div class="main-content">
		<div class="container">
			<div class="row">
				<div class="col-md-12 mt-5">
					<Info :material="material" />
				</div>
			</div>

			<div class="row">
				<div class="col-md-6">
					<Images :material="material" />
				</div>
				<div class="col-md-6">
					<Tags :material="material" />
				</div>
			</div>
			<div class="d-flex justify-content-between">
				<router-link tag="button" to="/libary" class="btn btn-default">
					<i class="fas fa-arrow-circle-start me-3"></i>Terug
				</router-link>

				<router-link
					:to="`/reservation/${$route.params.id}`"
					tag="button"
					class="btn btn-info"
					v-if="user"
				>
					Reserveer
					<i class="fas fa-pencil-alt ms-3"></i>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import Info from "@/components/libary/details/Info.vue";
	import Images from "@/components/libary/details/Images.vue";
	import Tags from "@/components/libary/details/Tags.vue";

	export default {
		name: "Detail",
		components: {
			Info,
			Images,
			Tags,
		},
		computed: {
			user() {
				return this.$store.getters.user;
			},

			materials() {
				return this.$store.getters.materials;
			},

			material() {
				if (this.materials) {
					const id = this.$route.params.id;
					return this.materials.filter((item) => item.id === id)[0];
				}
			},
		},
	};
</script>

<style lang="scss" scoped></style>
