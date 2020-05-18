<template>
	<div class="card">
		<div class="card-header d-flex">
			<h4 class="card-title mb-0">Algemene materiaal info</h4>
			<i class="information fas fa-info-circle ml-auto text-warning mt-1 mr-1"></i>
		</div>
		<div class="card-body">
			<div class="row">
				<div class="col-8 col-xl-5">
					<div class="form-group">
						<label>Naam</label>
						<input
							type="text"
							v-model="material.name"
							placeholder="Wat is het voor materiaal"
							class="form-control border-input"
							required
						/>
					</div>
				</div>
				<!-- TYPE -->
				<div class="col-4 col-xl-3 form-group">
					<label>Type</label>
					<select
						class="selectpicker form-control border-input show-tick"
						data-style="btn btn-neutral btn-block mt-0 border "
						v-model="material.type"
						required
						title="Selecteer..."
					>
						<option class="bs-title-option" value hidden disabled></option>
						<option value="Plaatmateriaal">Plaatmateriaal</option>
						<option value="Massief hout">Massief hout</option>
						<option value="Meubelstoffen">Meubelstoffen</option>
						<option value="Overige">Overige</option>
					</select>
				</div>

				<div class="col-8 col-xl-4">
					<div class="form-group">
						<label>Herkomst</label>
						<input
							type="text"
							v-model="material.origin"
							placeholder="Waar komt het materiaal vandaan?"
							class="form-control border-input"
							required
						/>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-sm-3">
					<div class="form-group">
						<label>Lengte</label>
						<input
							type="number"
							v-model.number="material.length"
							placeholder="Lengte"
							class="form-control"
							min="1"
							required
						/>
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label>Breedte</label>
						<input
							type="number"
							v-model.number="material.width"
							placeholder="Breedte"
							class="form-control"
							min="1"
							required
						/>
					</div>
				</div>
				<div class="col-sm-3">
					<div class="form-group">
						<label>Dikte</label>
						<input
							type="number"
							v-model.number="material.thickness"
							placeholder="Dikte"
							class="form-control"
							min="1"
							required
						/>
					</div>
				</div>
				<div class="col-sm-3" v-if="isNewMaterial">
					<div class="form-group">
						<label>Aantal</label>
						<input
							type="number"
							v-model.number="amount"
							placeholder="Aantal"
							class="form-control"
							min="1"
							required
						/>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-12">
					<div class="form-group">
						<label>Omschrijving</label>
						<textarea
							rows="5"
							v-model="material.description"
							placeholder="Omschrijving van het materiaal"
							class="form-control border-input"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ["material", "amount", "isNewMaterial"],
		mounted() {
			$(".selectpicker").selectpicker();
		}
	};
</script>

<style lang="scss" scoped>
	.information {
		font-size: 2.5rem;

		&:hover {
			cursor: pointer;
			animation: jello; /* referring directly to the animation's @keyframe declaration */
			animation-duration: 2s; /* don't forget to set a duration! */
		}
	}
</style>
