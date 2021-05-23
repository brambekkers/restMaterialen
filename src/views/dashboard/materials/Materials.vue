<template>
	<div class="content px-0 px-md-3">
		<div class="row justify-content-center">
			<div class="col-xxl-12 col-xxxl-8">
				<div class="card">
					<div class="card-header">
						<h4 class="card-title">Materialen in de database</h4>
					</div>
					<div class="card-body px-0 pb-0 ">
						<div class="row">
							<div class="col-md-5 col-lg-5 col-xl-3 ms-auto me-0 me-md-3">
								<Search @searchText="searchText = $event" />
							</div>
						</div>
						<ul
							class="nav nav-pills nav-pills-primary nav-pills-icons justify-content-center px-0 px-md-3"
							role="tablist"
						>
							<li class="nav-item w-50 text-center">
								<a
									class="nav-link active"
									data-bs-toggle="tab"
									href="#active"
									role="tablist"
								>
									Actief
								</a>
							</li>

							<li class="nav-item w-50 text-center">
								<a
									class="nav-link"
									data-bs-toggle="tab"
									href="#payments"
									role="tablist"
								>
									Betaald
								</a>
							</li>
						</ul>
						<div class="tab-content tab-space tab-subcategories pb-0 pt-2">
							<div class="tab-pane active border-top" id="active">
								<MaterialsListAdmin
									:materials="pagedMaterials"
									v-if="pagedMaterials"
									:unfilteredMaterials="materials"
								/>
								<Pagination
									:content="filteredMaterials"
									@changePage="changePage"
								/>
							</div>

							<div class="tab-pane border-top" id="payments">
								<PaymentList :payments="payments" />
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
	import Pagination from "@/components/Pagination.vue";

	export default {
		name: "Materials",
		components: { MaterialsListAdmin, PaymentList, Search, Pagination },
		data() {
			return {
				searchText: "",
				pagedMaterials: []
			};
		},
		computed: {
			...mapGetters(["materials", "payments"]),
			searchTags() {
				return this.searchText.split(" ").filter(a => a != "");
			},
			filteredMaterials() {
				if (this.materials) {
					if (this.searchTags.length) {
						return this.materials.filter(m => {
							for (const tag of this.searchTags) {
								for (const mTags of m.tags) {
									if (mTags.toLowerCase().includes(tag.toLowerCase())) {
										return true;
									}
								}
								return (
									m.name.toLowerCase().includes(tag.toLowerCase()) ||
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
						return this.payments.filter(p => {
							for (const tag of this.searchTags) {
								for (const mTags of m.tags) {
									if (mTags.toLowerCase().includes(tag.toLowerCase())) {
										return true;
									}
								}
								return p.name.toLowerCase().includes(tag.toLowerCase());
							}
						});
					}
					return this.materials;
				}
			},
			activeMaterials() {
				if (this.materials)
					return this.filteredMaterials.filter(m => m.unitAvalible);
			},
			reservatedMaterials() {
				if (this.materials)
					return this.filteredMaterials.filter(m => m.unitAvalible === 0);
			}
		},
		methods: {
			changePage(val) {
				this.pagedMaterials = val;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.nav {
		max-width: 500px !important;
		margin: auto;
	}
</style>
