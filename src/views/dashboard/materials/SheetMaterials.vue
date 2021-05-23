<template>
	<div class="content h-75 px-0 px-md-3">
		<div class="row justify-content-center">
			<div class="col-xxl-8 col-xxxl-5">
				<div class="card">
					<div class="card-header d-flex">
						<h4 class="card-title mb-0">Plaatmateriaal opties</h4>
						<Information :info="info" />
					</div>
					<div class="card-body px-0 px-md-3">
						<div class="card shadow-sm border mb-3">
							<h5 class="p-2">Drager</h5>

							<div class="table-responsive-lg">
								<table class="table table-striped">
									<thead class="text-primary">
										<tr>
											<th class="d-none d-md-table-cell">Type</th>
											<th>Naam</th>
											<th class="d-none d-md-table-cell">Orginele prijs</th>
											<th>Prijs</th>
											<th class="text-end">Acties</th>
										</tr>
									</thead>
									<!-- DRAGER -->
									<tbody>
										<template v-for="(mat, i) of dragerPage" :key="i">
											<tr class="item">
												<td class="text-capitalize d-none d-md-table-cell">
													{{ mat.type }}
												</td>
												<td class="text-capitalize">
													{{ mat.name }}
												</td>

												<td class="d-none d-md-table-cell">
													€{{ mat.originalPrice }} per m2
												</td>
												<td>€{{ mat.price }} per m2</td>
												<td class="text-end" nowrap>
													<button
														type="button"
														class="btn btn-info btn-sm btn-icon mx-1"
														data-bs-toggle="modal"
														data-bs-target="#editSheetOption"
														@click="editMaterial = mat"
													>
														<i class="fa fa-pen" />
													</button>
													<button
														type="button"
														class="btn btn-danger btn-sm btn-icon mx-1"
														@click="deleteSheetMaterial(i)"
													>
														<i class="fa fa-times" />
													</button>
												</td>
											</tr>
										</template>
									</tbody>
								</table>
								<Pagination :content="drager" @changePage="changeDragerPage" />
							</div>
						</div>

						<div class="card shadow-sm border mb-0">
							<h5 class="p-2">Dekfineer</h5>

							<div class="table-responsive-lg">
								<table class="table table-striped">
									<thead class="text-primary">
										<tr>
											<th class="d-none d-md-table-cell">Type</th>
											<th>Naam</th>
											<th class="d-none d-md-table-cell">Orginele prijs</th>
											<th>Prijs</th>
											<th class="text-end">Acties</th>
										</tr>
									</thead>
									<tbody>
										<template v-for="(mat, i) of dekfineerPage" :key="i">
											<tr class="item">
												<td class="text-capitalize d-none d-md-table-cell">
													{{ mat.type }}
												</td>
												<td class="text-capitalize">
													{{ mat.name }}
												</td>

												<td class="d-none d-md-table-cell">
													€{{ mat.originalPrice }} per m2
												</td>
												<td>€{{ mat.price }} per m2</td>
												<td class="text-end" nowrap>
													<button
														type="button"
														class="btn btn-info btn-sm btn-icon mx-1"
														data-bs-toggle="modal"
														data-bs-target="#editSheetOption"
														@click="editMaterial = mat"
													>
														<i class="fa fa-pen" />
													</button>
													<button
														type="button"
														class="btn btn-danger btn-sm btn-icon mx-1"
														@click="deleteSheetMaterial(i)"
													>
														<i class="fa fa-times" />
													</button>
												</td>
											</tr>
										</template>
									</tbody>
								</table>
								<Pagination
									:content="dekfineer"
									@changePage="changeDekfineerPage"
								/>
							</div>
						</div>
						<button
							class="btn btn-default float-end"
							type="submit"
							data-bs-toggle="modal"
							data-bs-target="#addSheetOption"
						>
							Aanpassen
						</button>
					</div>
				</div>
			</div>
		</div>
		<AddSheetModal />
		<EditSheetModal :material="editMaterial" />
	</div>
</template>

<script>
	import Information from "@/components/Information";
	import Pagination from "@/components/Pagination.vue";
	import AddSheetModal from "@/components/dashboard/materials/sheet/AddSheetModal";
	import EditSheetModal from "@/components/dashboard/materials/sheet/EditSheetModal";
	import { mapGetters, mapActions } from "vuex";

	export default {
		components: { Information, AddSheetModal, EditSheetModal, Pagination },
		data() {
			return {
				editMaterial: null,
				dragerPage: [],
				dekfineerPage: [],
				info: {
					title: "Plaatopties",
					msg: `<div class="text-start">
																			Je kunt hier de plaatopties toevoegen. Plaatopties zijn variabelen die het mogelijk maken om bij het toevoegen van een nieuw materiaal de prijs van plaatmateriaal te berekenen.</b>.<br><br> 

																			<h6 class="mb-0">Drager vs. dekfineer</h6>
																			Een stuk plaatmateriaal is altijd opgebouwd uit een basismateriaal bijv. MDF 18mm. Dit basismateriaal noemen we de drager. Daarnaast is het mogelijk dat een materiaal is voorzien van een draagfineer. Het dekfineer kan aan een enkele kant zitten of aan beide kanten. Er zijn vele verschillende soorten dekkingen. HPL, fineer, folie, enz...<br><br>

																			<h6 class="mb-0">Prijs</h6>
																			De prijs die het materiaal orgineel kost kan verschillen van de prijs die het HMC rekend voor dit materiaal. In de berekening wordt alleen de HMC prijs meegenomen.<br><br>

																			</div>`
				}
			};
		},
		computed: {
			...mapGetters(["sheetMaterials"]),
			dekfineer() {
				if (!this.sheetMaterials) return [];
				return this.sheetMaterials
					.filter(mat => mat.type === "dekfineer")
					.sort((a, b) => a.name.localeCompare(b.name));
			},
			drager() {
				if (!this.sheetMaterials) return [];
				return this.sheetMaterials
					.filter(mat => mat.type === "drager")
					.sort((a, b) => a.name.localeCompare(b.name));
			}
		},
		methods: {
			...mapActions(["updatesheetMaterials", "alert", "notification"]),
			editSheetMaterial(i) {
				console.log("edit");
			},
			async deleteSheetMaterial(i) {
				try {
					await this.alert({
						type: "confirm",
						msg: {
							title: "Plaatoptie verwijderen?",
							text:
								"Weet je zeker dat je deze plaatoptie wilt verwijderen? Wanneer je deze plaatoptie verwijderd kan dit niet meer ongedaan worden gemaakt."
						}
					});
					this.sheetMaterials.splice(i, 1);
					this.updatesheetMaterials(this.sheetMaterials);
				} catch (err) {}
			},
			changeDragerPage(val) {
				this.dragerPage = val;
			},
			changeDekfineerPage(val) {
				this.dekfineerPage = val;
			}
		}
	};
</script>

<style lang="scss" scoped>
	table {
		th {
			padding-top: 0 !important;
		}
	}
</style>
