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
							<FormInfo
								:material.sync="material"
								:isNewMaterial="false"
							/>
						</div>
					</div>
					<div class="row">
						<!-- Prijs -->
						<div class="col-md-12">
							<FormPrice
								:material.sync="material"
								:edit="true"
							/>
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
					<button
						class="btn btn-danger"
						@click.prevent="deleteButton"
					>Delete materiaal</button>
					<button
						class="btn btn-default float-right"
						type="submit"
					>Update materiaal</button>
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
	watch: {
		materials() {
			this.syncMaterial();
		}
	},
	computed: {
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
