<template>
	<div class="card">
		<div class="card-header">
			<h4 class="card-title mb-0">Afbeeldingen</h4>
		</div>
		<div class="card-body">
			<div class="row">
				<div class="col-12 col-xl-8">
					<div class="form-group">
						<input
							type="file"
							id="newImage"
							accept="image/png, image/jpeg"
							class="form-control-file mt-2"
						/>
					</div>
				</div>
				<div class="col-12 col-lg-4 text-end">
					<button
						class="btn btn-outline-primary mt-0 text-nowrap w-100"
						@click.prevent="addImage()"
					>
						Voeg toe
					</button>
				</div>
			</div>

			<!-- Images -->
			<div class="col-12">
				<div class="form-group" v-if="material.images.length">
					<br />

					<span
						v-for="(image, i) of material.images"
						:key="image.path"
						class="thumbnail"
					>
						<img :src="image.url" class="img-thumbnail" />
						<i class="close fas fa-times" @click="removeImage(i)"></i>
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
		async addImage() {
			// Get files from input
			const input = document.getElementById("newImage");
			if (input.files && input.files[0]) {
				const image = input.files[0];
				// Upload files to server
				// return image info (url and path)
				const oldPath = await this.$store.dispatch("uploadImage", image);
				const { url, path } = await this.$store.dispatch("getImageUrl", oldPath);
				// Push image info to material
				this.material.images.push({ path, url });
				await this.$store.dispatch("updateMaterial", this.material);

				input.value = "";
			}
		},

		async removeImage(i) {
			const path = this.material.images[i].path;
			const isremoved = await this.$store.dispatch("removeImage", path);

			if (isremoved) {
				this.material.images.splice(i, 1);
				await this.$store.dispatch("updateMaterial", this.material);
			}
			//
		},
	},
};
</script>

<style lang="scss" scoped>
.thumbnail {
	display: inline-block;
	position: relative;
	width: 200px;
	height: auto;
	margin: 10px 10px;
}

.close {
	position: absolute;
	cursor: pointer;
	color: red;
	font-size: 1.1rem;
	top: -5px;
	right: -2px;
}
</style>
