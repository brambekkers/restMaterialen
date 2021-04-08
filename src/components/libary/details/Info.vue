<template>
	<div class="card" v-if="material">
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
							v-model.number="material.thickness"
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
							class="form-control border-input"
							disabled
						/>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-12 col-md-6">
					<div class="form-group">
						<label>Prijs</label>
						<input
							type="text"
							:value="`${
								material.price
							} euro per ${material.priceUnit.toLowerCase()}`"
							placeholder="Waar komt het materiaal vandaan?"
							class="form-control border-input"
							disabled
						/>
					</div>
				</div>

				<div class="col-12 col-md-6">
					<div class="form-group">
						<label>Beschikbaarheid</label>
						<input
							type="text"
							:value="`${material.unitAvalible} ${unit} beschikbaar`"
							placeholder="Waar komt het materiaal vandaan?"
							class="form-control border-input"
							disabled
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ["material"],
		computed: {
			unit() {
				if (this.material.unitAvalible > 1) {
					return this.material.priceUnit.replace("plaat", "platen");
				}
			},
		},
	};
</script>
