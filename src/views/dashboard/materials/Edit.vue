<template>
	<div class="content">
		<form @submit.prevent="updateMaterial()">
			<div class="row">
				<!-- Algemene info -->
				<div class="col-md-8 col-lg-8 col-xl-10">
					<Info :material.sync="material" :isNewMaterial="false" />
				</div>
				<!-- QR -->
				<div
					class="col-sm-6 col-md-4 col-lg-4 col-xl-2 d-flex align-items-stretch"
				>
					<QR :material.sync="material" :isNewMaterial="false" />
				</div>
				<!-- Prijs -->
				<div class="col-sm-6 col-md-12">
					<Price :material.sync="material" :edit="true" />
				</div>
			</div>

			<div class="row">
				<!-- Afbeeldingen -->
				<div class="col-6">
					<Images :material.sync="material" />
				</div>
				<!-- Labels -->
				<div class="col-6">
					<Tags :material.sync="material" />
				</div>
			</div>
			<button class="btn btn-danger" @click.prevent="deleteButton">
				Delete materiaal
			</button>
			<button class="btn btn-default float-right" type="submit">
				Update materiaal
			</button>
		</form>
	</div>
</template>

<script>
	import Info from "@/components/dashboard/materials/Info.vue";
	import Price from "@/components/dashboard/materials/Price.vue";
	import Images from "@/components/dashboard/materials/Images.vue";
	import Tags from "@/components/dashboard/materials/Tags.vue";
	import QR from "@/components/dashboard/materials/QR.vue";

	export default {
		name: "EditMaterial",
		components: {
			Info,
			Price,
			Images,
			Tags,
			QR,
		},
		data() {
			return {
				material: {
					name: "",
					type: "",
					origin: "",
					length: null,
					width: null,
					thickness: null,
					description: "",
					claimed: false,
					price: null,
					priceUnit: "",
					unitAmount: null,
					tags: [],
					images: [],
					creationTime: null,
					lastEditTime: null,
				},
			};
		},

		watch: {
			materials() {
				this.syncMaterial();
			},
		},
		computed: {
			materials() {
				return this.$store.getters.materials;
			},
		},
		methods: {
			async updateMaterial() {
				this.material.lastEditTime = new Date();

				try {
					await this.$store.dispatch("updateMaterial", this.material);
					// onComplete:
					this.$store.dispatch("notification", {
						style: "success",
						msg: {
							title: "Update!",
							text: "Het materiaal is succesvol upgedate!",
						},
					});
					// Redirect
					this.$router.push("/dashboard/materials");
				} catch (err) {
					this.$store.dispatch("notification", {
						style: "error",
						msg: err,
					});
				}
			},
			async deleteButton() {
				try {
					await this.$store.dispatch("alert", {
						type: "confirm",
						msg: {
							title: "Materiaal verwijderen?",
							text:
								"Weet je zeker dat je dit materiaal wilt verwijderen? Wanneer je dit materiaal verwijderd verlies je al de data en dit kan niet meer ongedaan worden gemaakt.",
						},
					});
					this.deleteMaterial();
				} catch (error) {
					// Do nothing
				}
			},
			deleteMaterial() {
				try {
					this.$store.dispatch("deleteMaterial", this.material);
					// onComplete:
					this.$store.dispatch("notification", {
						style: "success",
						msg: {
							title: "Verwijderd!",
							text: "Het materiaal is succesvol verwijderd!",
						},
					});
					// Redirect
					this.$router.push("/dashboard/materials");
				} catch (err) {
					this.$store.dispatch("notification", {
						style: "error",
						msg: err,
					});
				}
			},
			syncMaterial() {
				if (this.materials) {
					const id = this.$route.params.id;
					this.material = this.materials.filter(
						(item) => item.id === id
					)[0];

					$(".selectpicker").selectpicker();
				}
			},
		},
		mounted() {
			this.syncMaterial();
		},
		updated() {
			$(".selectpicker").selectpicker();
		},
	};
</script>

<style lang="scss" scoped></style>
