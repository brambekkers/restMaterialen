<template>
	<tr class="item" @click="toItem" v-if="material.unitAvalible > 0">
		<td>
			<MaterialThumbnail :images="material.images" :width="50" :height="50" />
		</td>
		<td>{{ material.name }}</td>
		<td class="d-none d-md-table-cell">{{ material.type }}</td>
		<td class="d-none d-md-table-cell">{{ material.length }}</td>
		<td class="d-none d-md-table-cell">{{ material.width }}</td>
		<td class="d-none d-md-table-cell">{{ material.thickness }}</td>
		<td>
			€{{ material.price }}
			<span class="d-none d-md-block"> per {{ material.priceUnit }}</span>
		</td>
	</tr>
</template>

<script>
import MaterialThumbnail from "@/components/libary/MaterialThumbnail.vue";

export default {
	props: ["material"],
	components: { MaterialThumbnail },
	methods: {
		toItem() {
			this.$router.push(`${this.$route.fullPath}/${this.material.id}`);
		},
	},
};
</script>

<style lang="scss" scoped>
.item {
	cursor: pointer;
	&:hover {
		background: #f4f3ef;
	}
}
</style>
