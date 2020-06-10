<template>
	<tr class="item">
		<td>
			<MaterialThumbnail :images="material.images" :width="50" :height="50" />
		</td>
		<td>{{ material.name }}</td>
		<td>{{ material.type }}</td>
		<td>{{ material.length }} x {{ material.width }} x {{ material.thickness }}</td>
		<td>{{ material.price }} euro {{ material.priceUnit.toLowerCase() }}</td>
		<td class="text-center">{{material.unitAvalible}} / {{material.unitAmount}} {{material.unit}}</td>
		<td class="text-right">
			<router-link
				type="button"
				rel="tooltip"
				:to="`/dashboard/materials/${material.id}`"
				class="btn btn-success btn-sm btn-icon mx-1"
				data-toggle="tooltip"
				data-placement="top"
				title="Bekijk materiaal"
			>
				<i class="far fa-eye"></i>
			</router-link>
			<router-link
				type="button"
				rel="tooltip"
				:to="`/materials/edit/${material.id}`"
				class="btn btn-info btn-sm btn-icon mx-1"
				data-toggle="tooltip"
				data-placement="top"
				title="Bewerk materiaal"
			>
				<i class="fa fa-edit"></i>
			</router-link>
			<button
				type="button"
				rel="tooltip"
				class="btn btn-danger btn-sm btn-icon mx-1"
				data-toggle="tooltip"
				data-placement="top"
				title="Verwijder materiaal"
				@click.stop="deleteButton()"
			>
				<i class="fa fa-times"></i>
			</button>
		</td>
	</tr>
</template>

<script>
	import MaterialThumbnail from "@/components/libary/MaterialThumbnail.vue";

	export default {
		props: ["material"],
		components: { MaterialThumbnail },
		methods: {
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
			async deleteMaterial() {
				try {
					await this.$store.dispatch("deleteMaterial", this.material);
					// onComplete:
					await this.$store.dispatch("notification", {
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
			}
		},
		mounted() {
			$('[data-toggle="tooltip"]').tooltip();
		}
	};
</script>

<style lang="scss" scoped>
	.item {
		cursor: pointer;
		&:hover {
			background: #f4f3ef;
		}
	}

	.preview_image {
		width: 70px;
		height: 70px;
		background: url("../../../assets/img/noImage.jpg");

		background-repeat: no-repeat !important;
		background-size: cover !important;
		border-radius: 50%;
	}
</style>
