<template>
	<div class="card">
		<div class="card-header d-flex">
			<h4 class="card-title mb-0">Prijs</h4>
			<Information :info="info" />
		</div>
		<div class="card-body">
			<div class="row">
				<!-- Price -->
				<div class="col-sm-6 col-md-3">
					<div class="form-group">
						<label>Prijs</label>
						<input
							type="number"
							v-model.number="material.price"
							step="any"
							min="1"
							placeholder="Wat is de prijs"
							class="form-control border-input"
							required
						/>
					</div>
				</div>
				<!-- Type -->
				<div class="col-sm-6 col-md-3 form-group">
					<label>Eenheid</label>
					<select
						class="form-select form-control border-input show-tick"
						v-model="material.priceUnit"
						required
						title="Selecteer..."
					>
						<option
							class="bs-title-option"
							:value="null"
							hidden
							disabled
						></option>
						<optgroup label="Losse producten">
							<option value="stuk">Per stuk</option>
							<option value="rol">Per rol</option>
							<option value="meter">Per meter</option>
						</optgroup>
						<optgroup label="Plaatmateriaal">
							<option value="plaat">Per plaat</option>
							<option value="halve plaat">Per halve plaat</option>
							<option value="kwart plaat">Per kwart plaat</option>
						</optgroup>
						<!-- <option value="Per m3">Per m3</option> -->
						<!-- <option value="Per m2">Per m2</option> -->
					</select>
				</div>
				<!-- Amount -->
				<template v-if="material.priceUnit && !edit">
					<div
						class="col form-group"
						v-if="material.priceUnit === 'meter'"
					>
						<label
							>Dit materiaal (één stuk) bestaat uit hoeveel
							{{ material.priceUnit }}?</label
						>
						<input
							type="number"
							v-model.number="material.unitAmount"
							placeholder="Aantal stuks uit dit materiaal"
							class="form-control border-input"
							required
							min="1"
						/>
					</div>
					<!-- Amount -->
					<div class="col form-group" v-else>
						<label
							>Hoeveel stuk heb je van deze
							{{ material.priceUnit }}?</label
						>
						<input
							type="number"
							v-model.number="material.unitAmount"
							placeholder="Aantal stuks"
							class="form-control border-input"
							required
							min="1"
						/>
					</div>
				</template>
				<!-- Amount left-->
				<div class="col-md-6 col-xl form-group" v-if="edit">
					<label
						>Hoeveel {{ material.priceUnit }} is er nog over van de
						{{ material.unitAmount }}</label
					>

					<input
						type="number"
						v-model.number="material.unitAvalible"
						placeholder="Aantal stuks nog beschikbaar"
						class="form-control border-input"
						required
						min="1"
						:max="material.unitAmount"
						disabled
					/>
				</div>
			</div>
			<div
				class="form-group"
				v-if="
					material.price &&
					material.unitAmount &&
					material.unitAmount > 1
				"
			>
				<label>
					Totale prijs:
					<span class="title display-inline text-dark">
						{{ material.price * material.unitAmount }} euro
					</span>
				</label>
			</div>
			<button
				class="btn btn-primary mt-0"
				v-if="material.type === 'Plaatmateriaal'"
				data-bs-toggle="modal"
				data-bs-target="#calcSheetPrice"
			>
				Bereken plaatprijs
			</button>
			<CalcSheetPriceModal :surfaceArea="material.surfaceArea" />
		</div>
	</div>
</template>

<script>
	import Information from "@/components/Information";
	import CalcSheetPriceModal from "@/components/dashboard/materials/CalcSheetPriceModal";

	export default {
		components: { Information, CalcSheetPriceModal },
		props: ["material", "edit"],
		data() {
			return {
				info: {
					title: "Prijs informatie",
					msg: `
																																										                <div class="text-start">
																																										                Bij dit blok geef je de gebruiker informatie over de prijs van het materiaal en de afnamehoeveelheid. 
																																										                Het is hierbij belangrijk dat je besluit hoeveel de gebruiker mag/kan afnemen.<br><br>

																																										                <b>Voorbeeld 1:</b><br>
																																										                Je besluit dat een stuk plaatmateriaal per kwart kan worden verkocht. De gebruiker moet dus minimaal 1/4de deel van het materiaal afnemen. 
																																										                In dit speciefieke voorbeeld geld dus dat een hele plaat uit 4 delen bestaat. Je geeft de prijs per deel op en vervolgens het aantal delen (vier in dit geval).<br><br> 
																																										                
																																										                <b>Voorbeeld 2:</b><br>
																																										                Je hebt een rol van 50 meter stof om aan te bieden. De gebruiker mag per meter inkopen. In dit voorbeeld zet je de eenheid op prijs 'per meter' en je geeft aan hoeveel één meter stof kost. 
																																										                Daarna geef je aan dat er 50 eenheden uit het totaal kunnen worden gehaald.<br><br>

																																										                Het is dus belangrijk dat in dit formulier de prijs, éénheid en het totaal moet worden aangegeven. Controleer de waardes goed.
																																										                </div>`,
				},
			};
		},
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
