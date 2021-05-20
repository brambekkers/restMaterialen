<template>
	<div class="table-responsive-md" v-if="materials && materials.length">
		<table class="table table-striped">
			<thead class="text-primary border-bottom">
				<tr>
					<th></th>
					<th>Naam</th>
					<th class="d-none d-md-table-cell">Type</th>
					<th class="d-none d-md-table-cell">Lengte</th>
					<th class="d-none d-md-table-cell">Breedte</th>
					<th class="d-none d-md-table-cell">Dikte</th>
					<th>Prijs</th>
				</tr>
			</thead>
			<tbody>
				<Material
					v-for="material of materials"
					:key="material.id"
					:material="material"
				/>
			</tbody>
		</table>
	</div>
	<div
		class="border-top pt-3"
		v-else-if="unfilteredMaterials && !unfilteredMaterials.length"
	>
		<h6>Geen materiaal</h6>
		Op dit moment staan er geen materialen in de database.
	</div>
	<div class="border-top pt-3" v-else-if="materials && !materials.length">
		<h6>niets gevonden</h6>
		Geen materiaal met deze zoekterm
	</div>
</template>

<script>
import Material from "@/components/libary/Material.vue";

export default {
	components: { Material },
	props: ["materials", "unfilteredMaterials"],
};
</script>
