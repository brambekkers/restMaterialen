<template>
	<div class="content h-75">
		<div class="row justify-content-center">
			<div class="col-xxl-8 col-xxxl-5">
				<div class="card">
					<div class="card-header d-flex">
						<h4 class="card-title mb-0">Plaatmateriaal opties</h4>
						<Information :info="info" />
					</div>
					<div class="card-body">
						<div class="card shadow-sm border mb-0">
							<div class="table-responsive-lg">
								<table class="table table-striped">
									<thead class="text-primary">
										<tr>
											<th>Type</th>
											<th>Naam</th>
											<th>Orginele prijs</th>
											<th>Prijs</th>
											<th class="text-end">Acties</th>
										</tr>
									</thead>
									<tbody>
										<tr
											class="item"
											v-for="(mat, i) of sheetMaterials"
											:key="i"
										>
											<td class="text-capitalize">
												{{ mat.type }}
											</td>
											<td class="text-capitalize">
												{{ mat.name }}
											</td>

											<td>
												€{{ mat.originalPrice }} per m2
											</td>
											<td>€{{ mat.price }} per m2</td>
											<td class="text-end">
												<button
													type="button"
													class="btn btn-danger btn-sm btn-icon mx-1"
													@click="
														deleteSheetMaterial(i)
													"
												>
													<i class="fa fa-times" />
												</button>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>

						<button
							class="btn btn-default float-end"
							type="submit"
							data-bs-toggle="modal"
							data-bs-target="#addSheetOption"
						>
							Voeg optie toe
						</button>
					</div>
				</div>
			</div>
		</div>
		<AddSheetModal />
	</div>
</template>

<script>
	import Information from "@/components/Information";
	import AddSheetModal from "@/components/dashboard/materials/AddSheetModal";
	import { mapGetters, mapActions } from "vuex";

	export default {
		components: { Information, AddSheetModal },
		data() {
			return {
				info: {
					title: "Programmaopties",
					msg: `
																																																													<div class="text-start">
																																																													In het programmaopties menu zijn diverse technische instellingen te vinden voor het programma. Dit zijn algemene instellingen en gelden voor <b>alle gebruikers</b>.<br><br> 

																																																													<h6 class="mb-0">Reserveringsdagen</h6>
																																																													De optie reserveringsdagen is gemaakt om het aantal dagen dat een reserving onbetaald open blijft bestaan te beperken. Door een aantal dagen 
																																																													in te stellen komt het materiaal nadat de tijd is verlopen automatisch weer op beschikbaar te staan. De reservering wordt definietief wanneer deze is betaald en door een beheerder is geaccrediteerd.<br><br>

																																																													</div>`,
				},
			};
		},
		computed: {
			...mapGetters(["sheetMaterials"]),
		},
		methods: {
			...mapActions(["updatesheetMaterials"]),
			deleteSheetMaterial(i) {
				this.sheetMaterials.splice(i, 1);
				this.updatesheetMaterials(this.sheetMaterials);
			},
		},
	};
</script>
