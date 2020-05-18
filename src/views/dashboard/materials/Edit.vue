<template>
	<div class="wrapper">
		<Sidebar />
		<div class="main-panel">
			<Navbar :title="$route.name" />
			<div class="content">
				<form @submit.prevent="updateMaterial()">
					<div class="row">
						<!-- Algemene info -->
						<div class="col-md-12">
							<FormInfo :material.sync="material" :isNewMaterial="false" />
						</div>
					</div>
					<div class="row">
						<!-- Prijs -->
						<div class="col-md-12">
							<FormPrice :material.sync="material" />
						</div>
					</div>

					<div class="row">
						<!-- Afbeeldingen -->
						<div class="col-6">
							<FormImage :material.sync="material" />
						</div>
						<!-- Labels -->
						<div class="col-6">
							<FormTag :material.sync="material" />
						</div>
					</div>
					<button class="btn btn-danger" @click.prevent="deleteMaterial">Delete materiaal</button>
					<button class="btn btn-default float-right" type="submit">Update materiaal</button>
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
		name: "EditMaterial",
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
		computed: {
			materials() {
				return this.$store.getters.materials;
			}
		},
		methods: {
			async updateMaterial() {
				console.log("test");
				this.material.lastEditTime = new Date();
				const res = await this.$store.dispatch(
					"updateMaterial",
					this.material
				);
				console.log(res);

				if (res === true) {
					this.notification(true);
					this.$router.push("/dashboard/materials");
				} else {
					this.notification(false, res);
				}
			},
			deleteMaterial() {
				this.$store.dispatch("deleteMaterial", this.material);
			},
			notification(succes, error) {
				if (succes) {
					const color = "success";
					$.notify(
						{
							title: "Toegevoegd!",
							message: "Het materiaal is succesvol upgedate!"
						},
						{
							type: "success"
						}
					);
				} else {
					$.notify(
						{
							title: "Error",
							message: error
						},
						{
							type: "danger"
						}
					);
				}
			},
			syncMaterial() {
				if (this.materials) {
					const id = this.$route.params.id;
					const currentMaterial = this.materials.filter(
						item => item.id === id
					)[0];
					this.$set(this, "material", currentMaterial);
				}
			}
		},
		mounted() {
			this.syncMaterial();
		}
	};
</script>
