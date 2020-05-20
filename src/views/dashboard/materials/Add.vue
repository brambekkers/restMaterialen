<template>
	<div class="wrapper">
		<Sidebar />
		<div class="main-panel h-100">
			<Navbar :title="$route.name" />
			<div class="content">
				<form @submit.prevent="add()">
					<div class="row">
						<!-- Algemene info -->
						<div class="col-md-12">
							<FormInfo :material.sync="newMaterial" :amount.sync="amount" :isNewMaterial="true" />
						</div>
					</div>
					<div class="row">
						<!-- Prijs -->
						<div class="col-md-12">
							<FormPrice :material.sync="newMaterial" />
						</div>
					</div>

					<div class="row">
						<!-- Afbeeldingen -->
						<div class="col-6">
							<FormImage :material.sync="newMaterial" />
						</div>
						<!-- Labels -->
						<div class="col-6">
							<FormTag :material.sync="newMaterial" />
						</div>
					</div>
					<button class="btn btn-default float-right" type="submit">Voeg materiaal toe</button>
				</form>
			</div>
			<Footer />
		</div>
	</div>
</template>

<script>
	import Navbar from "@/components/dashboard/Navbar.vue";
	import Sidebar from "@/components/dashboard/Sidebar.vue";
	import Footer from "@/components/Footer.vue";

	import FormInfo from "@/components/dashboard/forms/Info.vue";
	import FormPrice from "@/components/dashboard/forms/Price.vue";
	import FormImage from "@/components/dashboard/forms/Image.vue";
	import FormTag from "@/components/dashboard/forms/Tag.vue";

	export default {
		name: "AddMaterial",
		data() {
			return {
				amount: 1,
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
					tags: [],
					images: [],
					creationTime: null,
					lastEditTime: null
				}
			};
		},
		components: {
			Sidebar,
			Navbar,
			Footer,
			FormInfo,
			FormPrice,
			FormImage,
			FormTag
		},
		methods: {
			async add() {
				for (let i = 0; i < this.amount; i++) {
					this.newMaterial.creationTime = new Date();
					this.newMaterial.lastEditTime = new Date();

					try {
						// add material
						await this.$store.dispatch("addMaterial", this.newMaterial);
						// onComplete:
						this.$store.dispatch("notification", {
							style: "success",
							msg: {
								title: "Succesvol Toegevoegd!",
								text:
									"Het materiaal is succesvol aan de database toegevoegd!"
							}
						});
						// Redirect
						this.$router.push("/dashboard/materials");
					} catch (err) {
						this.$store.dispatch("notification", {
							style: "error",
							msg: err
						});
					}
				}
			}
		}
	};
</script>
