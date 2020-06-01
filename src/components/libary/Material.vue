<template>
	<tr class="item" @click="toItem">
		<td>
			<MaterialThumbnail :images="material.images" :width="50" :height="50" />
		</td>
		<td>{{ material.name }}</td>
		<td>{{ material.type }}</td>
		<td>{{ material.length }}</td>
		<td>{{ material.width }}</td>
		<td>{{ material.thickness }}</td>
		<td>{{ material.price }} {{ material.priceUnit }}</td>
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
			}
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
</style>
