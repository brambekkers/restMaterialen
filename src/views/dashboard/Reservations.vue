<template>
	<div class="content h-75">
		<div class="row justify-content-center">
			<div class="col-xxl-8 col-xxxl-5">
				<div class="card">
					<div class="card-header">
						<h4 class="card-title">Reserveringen in de database</h4>
					</div>
					<div class="card-body">
						<div class="row">
							<div class="col-3 ms-auto">
								<Search @searchText="searchText = $event" />
							</div>
						</div>

						<div class="card">
							<ReservationsList :materials="filteredMaterials" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Loading from "@/components/Loading.vue";
import Search from "@/components/Search.vue";
import ReservationsList from "@/components/dashboard/reservations/ReservationsList.vue";

export default {
	name: "Reservations",
	components: {
		Search,
		Loading,
		ReservationsList,
	},
	data() {
		return {
			searchText: "",
		};
	},
	computed: {
		searchTags() {
			return this.searchText.split(" ").filter((a) => a != "");
		},
		materials() {
			return this.$store.getters.materials;
		},
		filteredMaterials() {
			if (this.materials) {
				if (this.searchTags.length) {
					return this.materials.filter((m) => {
						for (const tag of this.searchTags) {
							// Check for material tags
							// If material tag match searchTag
							for (const mTags of m.tags) {
								if (mTags.toLowerCase().includes(tag.toLowerCase())) return true;
							}
							// Check for studentNumber
							if (m.reservations && Object.keys(m.reservations).length) {
								for (const reservation of Object.values(m.reservations)) {
									if (reservation.studentNumber == tag) return true;
								}
							}
							return (
								m.name.toLowerCase().includes(tag.toLowerCase()) ||
								m.type.toLowerCase().includes(tag.toLowerCase()) ||
								(m.reservations && m.reservations[tag])
							);
						}
					});
				}
				return this.materials;
			}
		},
	},
};
</script>
