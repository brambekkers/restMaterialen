<template>
	<div class="card" v-if="material">
		<div class="card-header">
			<h4 class="card-title mb-0">Afbeeldingen</h4>
		</div>
		<div class="card-body">
			<!-- Images -->
			<div class="col-12">
				<div v-if="material.images.length">
					<span v-for="image of material.images" :key="image.path" class="thumbnail">
						<img :src="image.url" class="img-thumbnail" @click="openImage(image.url)" />
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ["material"],
		methods: {
			openImage(url) {
				this.$store.dispatch("alert", {
					type: "image",
					msg: url
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.thumbnail {
		display: inline-block;
		position: relative;
		width: 200px;
		height: auto;
		margin: 10px 10px;
		cursor: pointer;
	}
</style>
