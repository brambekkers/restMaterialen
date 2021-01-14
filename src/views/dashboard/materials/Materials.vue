<template>
	<div class="content">
		<div class="row justify-content-center">
			<div class="col-xxl-12 col-xxxl-8">
				<div class="card">
					<div class="card-header">
						<h4 class="card-title">Materialen in de database</h4>
					</div>
					<div class="card-body">
						<div class="row">
							<div class="col-md-5 col-lg-5 col-xl-3 ml-auto">
								<Search @searchText="searchText = $event" />
							</div>
						</div>
						<ul
							class="nav nav-pills nav-pills-primary nav-pills-icons justify-content-center"
							role="tablist"
						>
							<li class="nav-item">
								<a
									class="nav-link active"
									data-toggle="tab"
									href="#active"
									role="tablist"
								>
									Actief
								</a>
							</li>
							<li class="nav-item">
								<a
									class="nav-link"
									data-toggle="tab"
									href="#reservated"
									role="tablist"
								>
									Gereserveerd
								</a>
							</li>
							<li class="nav-item">
								<a
									class="nav-link"
									data-toggle="tab"
									href="#payments"
									role="tablist"
								>
									Betaald
								</a>
							</li>
						</ul>
						<div class="tab-content tab-space tab-subcategories">
							<div class="tab-pane active" id="active">
								<div class="card border">
									<MaterialsListAdmin
										:materials="activeMaterials"
										v-if="activeMaterials"
									/>
								</div>
							</div>
							<div class="tab-pane" id="reservated">
								<div
									class="card border"
									v-if="
										reservatedMaterials &&
										reservatedMaterials.length
									"
								>
									<MaterialsListAdmin
										:materials="reservatedMaterials"
									/>
								</div>
								<p v-else>
									Er staat geen materiaal open wat volledig is
									gereserveerd maar nog niet compleet is
									afgerond.
								</p>
							</div>
							<div class="tab-pane" id="payments">
								<div class="card border">
									<PaymentList :payments="payments" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";

	import MaterialsListAdmin from "@/components/dashboard/materials/MaterialsListAdmin.vue";
	import PaymentList from "@/components/dashboard/materials/PaymentList.vue";
	import Search from "@/components/Search.vue";

	export default {
		name: "Materials",
		components: { MaterialsListAdmin, PaymentList, Search },
		data() {
			return {
				searchText: "",
			};
		},
		computed: {
			...mapGetters(["materials", "payments"]),
			searchTags() {
				return this.searchText.split(" ").filter((a) => a != "");
			},
			filteredMaterials() {
				if (this.materials) {
					if (this.searchTags.length) {
						return this.materials.filter((m) => {
							for (const tag of this.searchTags) {
								for (const mTags of m.tags) {
									if (
										mTags
											.toLowerCase()
											.includes(tag.toLowerCase())
									) {
										return true;
									}
								}
								return (
									m.name
										.toLowerCase()
										.includes(tag.toLowerCase()) ||
									m.type.toLowerCase().includes(tag.toLowerCase())
								);
							}
						});
					}
					return this.materials;
				}
			},
			filteredPayments() {
				if (this.payments) {
					if (this.searchTags.length) {
						return this.payments.filter((p) => {
							for (const tag of this.searchTags) {
								for (const mTags of m.tags) {
									if (
										mTags
											.toLowerCase()
											.includes(tag.toLowerCase())
									) {
										return true;
									}
								}
								return p.name
									.toLowerCase()
									.includes(tag.toLowerCase());
							}
						});
					}
					return this.materials;
				}
			},
			activeMaterials() {
				if (this.materials)
					return this.filteredMaterials.filter((m) => m.unitAvalible);
			},
			reservatedMaterials() {
				if (this.materials)
					return this.filteredMaterials.filter(
						(m) => m.unitAvalible === 0
					);
			},
		},
	};
</script>
