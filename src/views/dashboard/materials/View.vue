<template>
	<div class="wrapper">
		<Sidebar />
		<div class="main-panel">
			<Navbar :title="$route.name" />
			<div class="content">
				<div class="row">
					<div class="col-md-8">
						<Info :material="material" />
					</div>
					<div class="col-md-4 h-100">
						<Admin :material="material" />
					</div>
					<div class="col-md-12">
						<Reservations :material="material" />
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
				<router-link
					:to="`/dashboard/materials/edit/${$route.params.id}`"
					tag="button"
					class="btn btn-secondary float-right"
				>
					Materiaal aanpassen
					<i class="fas fa-pencil-alt ml-3"></i>
				</router-link>
			</div>
			<Footer />
		</div>
	</div>
</template>

<script>
	import Navbar from "@/components/dashboard/Navbar.vue";
	import Sidebar from "@/components/dashboard/Sidebar.vue";
	import Footer from "@/components/Footer.vue";

	import Info from "@/components/libary/details/Info.vue";
	import Admin from "@/components/libary/details/Admin.vue";
	import Images from "@/components/libary/details/Images.vue";
	import Tags from "@/components/libary/details/Tags.vue";
	import Reservations from "@/components/libary/details/Reservations.vue";

	export default {
		name: "ViewMaterial",
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
			Info,
			Admin,
			Images,
			Tags,
			Reservations
		},
		watch: {
			materials() {
				this.syncMaterial();
			}
		},
		computed: {
			isEditor() {
				return this.$store.getters.isEditor;
			},
			materials() {
				return this.$store.getters.materials;
			}
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
							text: "Het materiaal is succesvol upgedate!"
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
			},
			async deleteButton() {
				try {
					await this.$store.dispatch("alert", {
						type: "confirm",
						msg: {
							title: "Materiaal verwijderen?",
							text:
								"Weet je zeker dat je dit materiaal wilt verwijderen? Wanneer je dit materiaal verwijderd verlies je al de data en dit kan niet meer ongedaan worden gemaakt."
						}
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
							text: "Het materiaal is succesvol verwijderd!"
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
			},
			syncMaterial() {
				if (this.materials) {
					const id = this.$route.params.id;
					const currentMaterial = this.materials.filter(
						item => item.id === id
					)[0];
					this.$set(this, "material", currentMaterial);
					$(".selectpicker").selectpicker();
				}
			}
		},
		mounted() {
			this.syncMaterial();
		},
		updated() {
			$(".selectpicker").selectpicker();
		}
	};
</script>

<style lang="scss" scoped></style>
