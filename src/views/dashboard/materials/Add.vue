<template>
	<div class="content">
		<form @submit.prevent="add()">
			<div class="row">
				<!-- Algemene info -->
				<div class="col-md-12">
					<Info :material.sync="newMaterial" :isNewMaterial="true" />
				</div>
			</div>
			<div class="row">
				<!-- Prijs -->
				<div class="col-md-12">
					<Price :material.sync="newMaterial" />
				</div>
			</div>

			<div class="row">
				<!-- Afbeeldingen -->
				<div class="col-6">
					<Images :material.sync="newMaterial" />
				</div>
				<!-- Labels -->
				<div class="col-6">
					<Tags :material.sync="newMaterial" />
				</div>
			</div>
			<button class="btn btn-default float-right" type="submit">
				Voeg materiaal toe
			</button>
		</form>
	</div>
</template>

<script>
	import Info from "@/components/dashboard/materials/Info.vue";
	import Price from "@/components/dashboard/materials/Price.vue";
	import Images from "@/components/dashboard/materials/Images.vue";
	import Tags from "@/components/dashboard/materials/Tags.vue";

	export default {
		name: "AddMaterial",
		components: {
			Info,
			Price,
			Images,
			Tags,
		},
		data() {
			return {
				newMaterial: {
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
					unitAvalible: null,
					tags: [],
					images: [],
					creationTime: null,
					lastEditTime: null,
				},
			};
		},

		methods: {
			async add() {
				this.newMaterial.creationTime = new Date();
				this.newMaterial.lastEditTime = new Date();
				this.newMaterial.unitAvalible = this.newMaterial.unitAmount;

				try {
					// add material
					await this.$store.dispatch("addMaterial", this.newMaterial);
					// onComplete:
					this.$store.dispatch("notification", {
						style: "success",
						msg: {
							title: "Succesvol Toegevoegd!",
							text:
								"Het materiaal is succesvol aan de database toegevoegd!",
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
		},
		mounted() {
			$(".selectpicker").selectpicker();
			this.$store.dispatch("createQRcode");
		},
	};
</script>
