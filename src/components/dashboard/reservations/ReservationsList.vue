<template>
	<div class="accordion" id="reservationsCollapse">
		<ul class="list-group list-group-flush border">
			<template v-for="material of materials">
				<li
					class="list-group-item p-0"
					:key="`title${material.id}`"
					v-if="
						material.reservations &&
						Object.values(material.reservations).length
					"
					data-bs-toggle="collapse"
					:data-target="`#collapse_${material.id}`"
					aria-expanded="true"
					:aria-controls="`collapse_${material.id}`"
				>
					<div class="material row py-2 px-4">
						<div class="col-2 d-flex align-items-center">
							<MaterialThumbnail
								:images="material.images"
								:width="40"
								:height="40"
							/>
						</div>
						<div class="col-6 d-flex align-items-center">
							<span class="title">{{ material.name }}</span>
						</div>
						<div class="col-4 d-flex align-items-center">
							<span
								>{{
									Object.values(material.reservations).length
								}}
								{{
									Object.values(material.reservations)
										.length > 1
										? "reserveringen"
										: "reservering"
								}}</span
							>
						</div>
					</div>
					<div
						:id="`collapse_${material.id}`"
						class="collapse"
						data-parent="#reservationsCollapse"
						:key="`collapse${material.id}`"
					>
						<table
							class="table mx-0 table-striped border-top mb-0 table-hover"
						>
							<thead class>
								<tr>
									<th class="ps-4">#</th>
									<th>Gebruiker</th>
									<th>Hoeveelheid</th>
									<th>Prijs</th>
									<th class="text-center">Betaalt</th>
									<th class="text-end pe-4">Acties</th>
								</tr>
							</thead>
							<tbody>
								<ReservationAdmin
									v-for="(
										reservation, key, i
									) in material.reservations"
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
		props: ["materials"],
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