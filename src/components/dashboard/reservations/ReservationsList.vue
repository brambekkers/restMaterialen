<template>
	<div class="accordion" id="reservationsCollapse">
		<ul class="list-group list-group-flush border">
			<template v-for="material of materials">
				<li
					class="list-group-item p-0"
					:key="`title${material.id}`"
					v-if="material.reservations.length"
					data-toggle="collapse"
					:data-target="`#collapse_${material.id}`"
					aria-expanded="true"
					:aria-controls="`collapse_${material.id}`"
				>
					<div class="material row py-2 px-4">
						<div class="col-2 d-flex align-items-center">
							<MaterialThumbnail :images="material.images" :width="40" :height="40" />
						</div>
						<div class="col-6 d-flex align-items-center">
							<span class="title">{{material.name}}</span>
						</div>
						<div class="col-4 d-flex align-items-center">
							<span>{{material.reservations.length}} {{material.reservations.length > 1 ?'reserveringen' : 'reservering'}}</span>
						</div>
					</div>
					<div
						:id="`collapse_${material.id}`"
						class="collapse"
						data-parent="#reservationsCollapse"
						:key="`collapse${material.id}`"
					>
						<table class="table mx-0 table-striped border-top mb-0 table-hover">
							<thead class>
								<tr>
									<th class="pl-4">#</th>
									<th>Gebruiker</th>
									<th>Hoeveelheid</th>
									<th class="text-center">Betaalt</th>
									<th class="text-right pr-4">Acties</th>
								</tr>
							</thead>
							<tbody>
								<ReservationAdmin
									v-for="(reservation, i) of material.reservations"
									:key="i"
									:reservation="reservation"
									:material="material"
									:index="i"
								/>
							</tbody>
						</table>
					</div>
				</li>
			</template>
		</ul>
	</div>
</template>

<script>
	import ReservationAdmin from "@/components/dashboard/reservations/ReservationAdmin.vue";
	import MaterialThumbnail from "@/components/libary/MaterialThumbnail.vue";

	export default {
		name: "ReservationsList",
		components: { ReservationAdmin, MaterialThumbnail },
		computed: {
			reservations() {
				return this.$store.getters.reservations;
			},
			materials() {
				return this.$store.getters.materials.map(material => {
					material.reservations = [];
					for (const reservation of this.reservations) {
						if (material.id === reservation.id) {
							material.reservations.push(reservation);
						}
					}
					return material;
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.list-group-item {
		cursor: pointer;

		&:hover {
			background: rgba(0, 0, 0, 0.05);
		}
	}
</style>