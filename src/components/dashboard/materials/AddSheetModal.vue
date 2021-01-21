<template>
	<div
		class="modal fade"
		id="addSheetOption"
		tabindex="-1"
		aria-labelledby="sheetOptionLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog">
			<form class="modal-content" @submit.prevent="update">
				<div class="modal-header d-flex">
					<h5 id="sheetOptionLabel">Voeg optie toe</h5>
					<button
						type="button"
						class="btn-close"
						data-bs-dismiss="modal"
						aria-label="Close"
					></button>
				</div>
				<div class="modal-body">
					<!-- Type -->
					<div class="mb-3">
						<label for="sheetOptionLabel">Type</label>
						<select
							class="form-select form-control text-capitalize"
							v-model="newOption.type"
							required
						>
							<option value="" selected disabled hidden>
								Selecteer een type
							</option>
							<option
								:value="type"
								v-for="type of types"
								:key="type"
								class="text-capitalize"
							>
								{{ type }}
							</option>
						</select>
					</div>
					<!-- Omschrijving -->
					<div class="mb-3">
						<label for="exampleInputPassword1" class="form-label">
							Omschrijving
						</label>
						<input
							type="text"
							class="form-control"
							required
							v-model="newOption.name"
						/>
					</div>
					<!-- Prijs -->
					<div class="row">
						<div class="col-6">
							<label
								for="exampleInputPassword1"
								class="form-label"
							>
								Orginele prijs per m2
							</label>
							<input
								type="number"
								class="form-control"
								required
								step="0.1"
								min="0"
								v-model.number="newOption.originalPrice"
							/>
						</div>
						<!-- Prijs -->
						<div class="col-6">
							<label
								for="exampleInputPassword1"
								class="form-label"
							>
								HMC prijs per m2
							</label>
							<input
								type="number"
								class="form-control"
								required
								step="0.1"
								min="0"
								v-model.number="newOption.price"
							/>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="submit" class="btn btn-primary">
						Voeg toe
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import * as bootstrap from "bootstrap";
	import { mapActions, mapGetters } from "vuex";
	export default {
		data() {
			return {
				types: ["materiaal", "dekking"],
				newOption: {
					type: "",
					name: "",
					originalPrice: 0,
					price: 0,
				},
			};
		},
		computed: {
			...mapGetters(["sheetMaterials"]),
		},
		methods: {
			...mapActions(["updatesheetMaterials"]),
			update() {
				console.log("test");
				this.sheetMaterials.push(this.newOption);
				this.updatesheetMaterials(this.sheetMaterials);
				this.closeModal();
			},
			closeModal() {
				const modal = document.getElementById("addSheetOption");
				const modalInstance = bootstrap.Modal.getInstance(modal);
				modalInstance.hide();
				this.newOption = {
					type: "",
					name: "",
					originalPrice: 0,
					price: 0,
				};
			},
		},
	};
</script>

<style>
</style>