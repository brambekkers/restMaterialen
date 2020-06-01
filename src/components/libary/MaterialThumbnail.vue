<template>
	<div
		class="preview_image img-thumbnail"
		:style="[size, background]"
		v-if="images && images.length"
	></div>
	<div :style="size" class="preview_image img-thumbnail" v-else></div>
</template>

<script>
	export default {
		props: ["images", "width", "height"],
		computed: {
			size() {
				return {
					width: `${this.width}px`,
					height: `${this.height}px`
				};
			},
			background() {
				return {
					background: `url(${this.images[0].url}`
				};
			}
		}
	};
</script>

<style lang="scss" scoped>
	.preview_image {
		display: inline-block;
		background: url("../../assets/img/noImage.jpg");

		background-repeat: no-repeat !important;
		background-size: cover !important;
		border-radius: 50%;
	}
</style>