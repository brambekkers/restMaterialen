<template>
	<tr class="item" @click="toItem">
		<td>
			<div
				class="preview_image img-thumbnail"
				:style="`background: url(${material.images[0].url})`"
				v-if="material.images && material.images.length"
			></div>
			<div class="preview_image img-thumbnail" v-else></div>
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
	export default {
		props: ["material"],
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

	.preview_image {
		width: 70px;
		height: 70px;
		background: url("../../../assets/img/noImage.jpg");

		background-repeat: no-repeat !important;
		background-size: cover !important;
		border-radius: 50%;
	}
</style>
