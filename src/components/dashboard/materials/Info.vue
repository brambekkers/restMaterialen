<template>
	<div class="card">
		<div class="card-header d-flex">
			<h4 class="card-title mb-0">Algemene materiaal info</h4>
			<Information :info="info" />
		</div>
		<div class="card-body">
			<div class="row">
				<div class="col-12 col-xl-5">
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
				<div class="col-6 col-xl-3 form-group">
					<label>Type</label>
					<select
						class="selectpicker form-control border-input show-tick"
						data-style="btn btn-neutral btn-block mt-0 border "
						v-model="material.type"
						required
						title="Selecteer..."
					>
						<option class="bs-title-option" :value="null" hidden>Selecteer...</option>
						<option value="Plaatmateriaal">Plaatmateriaal</option>
						<option value="Massief hout">Massief hout</option>
						<option value="Meubelstoffen">Meubelstoffen</option>
						<option value="Overige">Overige</option>
					</select>
				</div>

				<div class="col-6 col-xl-4">
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
				<div class="col-sm">
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
				<div class="col-sm">
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
				<div class="col-sm">
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
import Information from "@/components/Information";

export default {
	components: { Information },
	data() {
		return {
			info: {
				title: "Algemene informatie",
				msg: `
				<div class="text-left">
				Bij dit blok geef je de algemene informatie over het materiaal op. Dit is onder andere <b> Type, 
				herkomst, afmetingen</b> en <b>omschrijving</b>. Hierdoor weet de gebruiker met welk materiaal hij 
				te maken heeft. <br><br> 

				Het is belangrijk om in de omschrijvining <b>eventuele schade</b> aan het materiaal te vermelden. 
				Zo ontstaat er achteraf geen verwarring over wat er is gekocht. <br><br>

				<b>Let op:</b> Wanneer je bij het aantal meer dan één invult komen er ook meerdere materialen in de database. 
				Elk materiaal is dus een uniek stuk. Wil je het materiaal in stukken verkopen dat doe je dat <b>niet hier<b> maar bij de prijs
				</div>`,
			},
		};
	},
	props: ["material", "isNewMaterial"],
	updated() {
		$(".selectpicker").selectpicker();
	},
};
</script>

<style lang="scss" scoped></style>
