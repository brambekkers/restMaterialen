<template>
	<div class="table-responsive-lg">
		<table class="table table-striped">
			<thead class="text-primary">
				<tr>
					<th>ID</th>
					<th>Naam</th>
					<th>Type</th>
					<th>Afmetingen</th>
					<th>Prijs</th>
					<th>Beschikbaarheid</th>
					<th>Acties</th>
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
</template>

<script>
import Material from "@/components/dashboard/components/MaterialAdmin.vue";

export default {
	components: { Material },
	computed: {
		materials() {
			return this.$store.getters.materials;
		}
	}
};
</script>
