<template>
	<div
		class="modal fade"
		id="calcSheetPrice"
		tabindex="-1"
		aria-labelledby="calcSheetPriceLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog">
			<form class="modal-content" @submit.prevent="update">
				<div class="modal-header d-flex">
					<h5 id="calcSheetPriceLabel">Voeg optie toe</h5>
					<button
						type="button"
						class="btn-close"
						data-bs-dismiss="modal"
						aria-label="Close"
					></button>
				</div>
				<div class="modal-body">
					<!-- BasisMateriaal -->
					<div class="mb-3">
						<label>Wat is de drager</label>
						<select
							class="form-select form-control text-capitalize"
							v-model="calc.type"
							required
						>
							<option value="" selected disabled hidden>
								Selecteer een drager
							</option>
							<template
								v-for="(mat, i) of sheetMaterials"
								:key="i"
							>
								<option
									:value="mat"
									class="text-capitalize"
									v-if="mat.type === 'drager'"
								>
									{{ mat.name }}
								</option>
							</template>
						</select>
					</div>
					<!-- Aside -->
					<div class="mb-3">
						<label>Dekfineer A-kant</label>
						<select
							class="form-select form-control text-capitalize"
							v-model="calc.Aside"
							required
						>
							<option value="" selected disabled hidden>
								Selecteer een type
							</option>
							<option :value="{ price: 0 }">
								Geen dekfineer A-kant
							</option>
							<template
								v-for="(mat, i) of sheetMaterials"
								:key="i"
							>
								<option
									:value="mat"
									v-if="mat.type === 'dekfineer'"
								>
									{{ mat.name }}
								</option>
							</template>
						</select>
					</div>
					<!-- Aside -->
					<div class="mb-3">
						<label>Dekfineer B-kant</label>
						<select
							class="form-select form-control text-capitalize"
							v-model="calc.Bside"
							required
						>
							<option value="" selected disabled hidden>
								Selecteer een type
							</option>
							<option :value="{ price: 0 }">
								Geen dekfineer B-kant
							</option>
							<template
								v-for="(mat, i) of sheetMaterials"
								:key="i"
							>
								<option
									:value="mat"
									v-if="mat.type === 'dekfineer'"
								>
									{{ mat.name }}
								</option>
							</template>
						</select>
					</div>
					<hr />
					<!-- Aside -->
					<div class="mb-3 text-end">
						<h6>HMC-Plaatprijs</h6>
						<input
							type="number"
							class="form-control text-end"
							v-model="price"
							disabled
						/>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from "vuex";
	export default {
		props: ["surfaceArea"],
		data() {
			return {
				calc: {
					type: null,
					Aside: null,
					Bside: null,
				},
				price: 0,
			};
		},
		watch: {
			calc: {
				handler() {
					const c = this.calc;
					const sa = this.surfaceArea ? this.surfaceArea : 2.98;
					if (sa) {
						const type = c.type ? sa * c.type.price : 0;
						const Aside = c.Aside ? sa * c.Aside.price : 0;
						const Bside = c.Bside ? sa * c.Bside.price : 0;

						this.price = Number((type + Aside + Bside).toFixed(2));
					}
				},
				deep: true,
			},
		},
		computed: {
			...mapGetters(["sheetMaterials"]),
		},
		methods: {
			...mapActions(["updatesheetMaterials"]),
		},
	};
</script>

<style>
</style>