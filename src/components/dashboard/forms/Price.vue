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
						class="selectpicker form-control border-input show-tick"
						data-style="btn btn-neutral btn-block mt-0 border "
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

						<option value="Per stuk">Per stuk</option>
						<option value="Per meter">Per meter</option>
						<option value="Per m3">Per m3</option>
						<option value="Per plaat">Per plaat</option>
						<option value="Per m2">Per m2</option>
						<option value="Per deel">Per deel</option>
						<option value="Per rol">Per rol</option>
					</select>
				</div>
				<!-- Amount -->
				<div
					class="col-md-6 col-xl-6 form-group"
					v-if="this.unit != 'plaat' && this.unit != 'stuk' && this.unit != 'rol' "
				>
					<label>Dit materiaal (één stuk) bestaat uit hoeveel {{unit}}?</label>
					<div class="row">
						<div class="col-6 col-md-10 col-xl-8"><input
								type="number"
								v-model.number="material.unitAmount"
								placeholder="Aantal stuks uit dit materiaal"
								class="form-control border-input "
								required
								min="1"
							/></div>
					</div>

				</div>
				<!-- Amount left-->
				<div
					class="col-md-6 col-xl-6 form-group"
					v-if="edit"
				>
					<label>Hoeveel {{unit}} is er nog over van de {{material.unitAmount}}</label>
					<div class="row">
						<div class="col-6 col-md-10 col-xl-8"><input
								type="number"
								v-model.number="material.unitAvalible"
								placeholder="Aantal stuks nog beschikbaar"
								class="form-control border-input "
								required
								min="0"
								:max="material.unitAmount"
							/></div>
					</div>

				</div>
			</div>
			<div
				class="form-group"
				v-if="material.price && material.unitAmount"
			>
				<label>(Prijs per {{ material.unitAmount}} {{unit}})</label>
				<p class="mb-0">
					Totale prijs voor dit onderdeel:
					<h5 class="ml-5 title mt-0 ">{{ material.price * material.unitAmount}} euro</h5>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import Information from "@/components/Information";

export default {
	components: { Information },
	props: ["material", "edit"],
	watch: {
		unit() {
			if (
				this.unit === "plaat" ||
				this.unit === "stuk" ||
				this.unit === "rol"
			) {
				this.material.unitAmount = 1;
			}
		}
	},
	computed: {
		unit() {
			if (this.material.priceUnit) {
				const unit = this.material.priceUnit.split(" ")[1];
				if (unit === "deel") return "delen";
				return unit;
			}
			return "eenheden";
		}
	},
	data() {
		return {
			info: {
				title: "Prijs informatie",
				msg: `
                <div class="text-left">
                Bij dit blok geef je de gebruiker informatie over de prijs van het materiaal en de afnamehoeveelheid. 
                Het is hierbij belangrijk dat je besluit hoeveel de gebruiker mag/kan afnemen.<br><br>

                <b>Voorbeeld 1:</b><br>
                Je besluit dat een stuk plaatmateriaal per kwart kan worden verkocht. De gebruiker moet dus minimaal 1/4de deel van het materiaal afnemen. 
                In dit speciefieke voorbeeld geld dus dat een hele plaat uit 4 delen bestaat. Je geeft de prijs per deel op en vervolgens het aantal delen (vier in dit geval).<br><br> 
                
                <b>Voorbeeld 2:</b><br>
                Je hebt een rol van 50 meter stof om aan te bieden. De gebruiker mag per meter inkopen. In dit voorbeeld zet je de eenheid op prijs 'per meter' en je geeft aan hoeveel één meter stof kost. 
                Daarna geef je aan dat er 50 eenheden uit het totaal kunnen worden gehaald.<br><br>

                Het is dus belangrijk dat in dit formulier de prijs, éénheid en het totaal moet worden aangegeven. Controleer de waardes goed.
                </div>`
			}
		};
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
