<template>
	<div class>
		<Navbar />
		<div class="main-content">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<div class="card mt-5">
							<div class="card-header">
								<h4 class="card-title">{{ material.name }}</h4>
							</div>
							<div class="card-body">
								<div class="row">
									<div class="col-4 col-xl-2">
										<div class="form-group">
											<label>Type</label>
											<input
												type="text"
												v-model="material.type"
												placeholder="Waar komt het materiaal vandaan?"
												class="form-control border-input"
												disabled
											/>
										</div>
									</div>

									<div class="col-8 col-xl-5">
										<div class="form-group">
											<label>Herkomst</label>
											<input
												type="text"
												v-model="material.origin"
												placeholder="Waar komt het materiaal vandaan?"
												class="form-control border-input"
												disabled
											/>
										</div>
									</div>
								</div>

								<div class="row">
									<div class="col-sm-4">
										<div class="form-group">
											<label>Lengte</label>
											<input
												type="number"
												v-model.number="material.length"
												placeholder="Lengte"
												class="form-control"
												min="1"
												disabled
											/>
										</div>
									</div>
									<div class="col-sm-4">
										<div class="form-group">
											<label>Breedte</label>
											<input
												type="number"
												v-model.number="material.width"
												placeholder="Breedte"
												class="form-control"
												min="1"
												disabled
											/>
										</div>
									</div>
									<div class="col-sm-4">
										<div class="form-group">
											<label>Dikte</label>
											<input
												type="number"
												v-model.number="
                                                    material.thickness
                                                "
												placeholder="Dikte"
												class="form-control"
												min="1"
												disabled
											/>
										</div>
									</div>
								</div>

								<div class="row">
									<div class="col-12">
										<div class="form-group">
											<label>Omschrijving</label>
											<textarea
												rows="10"
												v-model="material.description"
												placeholder="Omschrijving van het materiaal"
												class="form-control border-input"
												disabled
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6">
								<div class="card">
									<div class="card-header">
										<h4 class="card-title mb-0">Afbeeldingen</h4>
									</div>
									<div class="card-body">
										<!-- Images -->
										<div class="col-12">
											<div v-if="material.images.length">
												<span v-for="image of material.images" :key="image.path" class="thumbnail">
													<img :src="image.url" class="img-thumbnail" />
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="col-md-6">
								<div class="card">
									<div class="card-header">
										<h4 class="card-title mb-0">Labels</h4>
									</div>
									<div class="card-body">
										<!-- Labels -->
										<div class="col-12">
											<div class="form-group" v-if="material.tags.length">
												<span v-for="tag of material.tags" :key="tag" class="tag">{{ tag }}</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="d-flex justify-content-between">
					<router-link tag="button" to="/libary" class="btn btn-default">
						<i class="fas fa-arrow-circle-left mr-3"></i>Terug
					</router-link>

					<button class="btn btn-info">
						Reserveer
						<i class="fas fa-pencil-alt ml-3"></i>
					</button>
				</div>
			</div>
		</div>
		<Footer />
	</div>
</template>

<script>
	import Navbar from "@/components/Navbar.vue";
	import Footer from "@/components/Footer.vue";

	export default {
		name: "Detail",
		components: {
			Navbar,
			Footer
		},
		computed: {
			materials() {
				return this.$store.getters.materials;
			},
			material() {
				if (this.materials) {
					const id = this.$route.params.id;
					return this.materials.filter(item => item.id === id)[0];
				}
			}
		},
		mounted() {
			$(".selectpicker").selectpicker();
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

		img {
		}
	}

	.tag {
		display: inline-block;
		position: relative;
		margin: 0 5px;
		border-radius: 27px;
		font-size: 13px;
		letter-spacing: 0.45px;
		background: #fdfdfd;
		padding: 8px 18px;
		color: #464748;
		border: 1px solid #e8e5e5;
	}
</style>
