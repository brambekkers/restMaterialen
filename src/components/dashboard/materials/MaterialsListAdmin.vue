<template>
	<div class="table-responsive-lg" v-if="materials && materials.length">
		<table class="table table-striped">
			<thead class="text-primary border-bottom">
				<tr>
					<th>ID</th>
					<th>Naam</th>
					<th class="d-none d-md-table-cell">Type</th>
					<th class="d-none d-md-table-cell">Afmetingen</th>
					<th class="d-none d-md-table-cell">Prijs</th>
					<th class="text-center d-none d-md-table-cell">Beschikbaarheid</th>
					<th class="text-end">Acties</th>
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
		class="p-3"
		v-else-if="unfilteredMaterials && !unfilteredMaterials.length"
	>
		<h6>Geen materiaal</h6>
		Op dit moment staan er geen materialen in de database.
		<router-link class="link" to="/dashboard/materials/add">
			Klik hier om materiaal toe te voegen</router-link
		>.
	</div>
	<div class="p-3" v-else-if="materials && !materials.length">
		<h6>niets gevonden</h6>
		Geen materiaal met deze zoekterm
	</div>
</template>

<script>
import Material from "@/components/dashboard/materials/MaterialAdmin.vue";

export default {
	components: { Material },
	props: ["materials", "unfilteredMaterials"],
};
</script>

<style lang="scss" scoped>
.link {
	text-decoration: none;
	font-weight: 600;
}
</style>
