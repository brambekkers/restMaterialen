<template>
	<div class="wrapper">
		<Sidebar />
		<div class="main-panel h-100">
			<Navbar :title="$route.name" />
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
										<Search :searchText.sync="searchText" />
									</div>
								</div>
								<ul
									class="nav nav-pills nav-pills-primary nav-pills-icons justify-content-center"
									role="tablist"
								>
									<li class="nav-item">
										<a class="nav-link active" data-toggle="tab" href="#active" role="tablist">
											<i class="now-ui-icons objects_umbrella-13"></i>
											Actief
										</a>
									</li>
									<li class="nav-item">
										<a class="nav-link" data-toggle="tab" href="#reservated" role="tablist">
											<i class="now-ui-icons shopping_shop"></i>
											Gereserveerd
										</a>
									</li>
									<li class="nav-item">
										<a class="nav-link" data-toggle="tab" href="#archive" role="tablist">
											<i class="now-ui-icons ui-2_settings-90"></i>
											Archief
										</a>
									</li>
								</ul>
								<div class="tab-content tab-space tab-subcategories">
									<div class="tab-pane active" id="active">
										<div class="card border">
											<MaterialsListAdmin />
										</div>
									</div>
									<div class="tab-pane" id="reservated">
										Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas.
										<br />
										<br />Dramatically maintain clicks-and-mortar solutions without functional solutions.
									</div>
									<div class="tab-pane" id="archive">
										Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas.
										<br />
										<br />Dynamically innovate resource-leveling customer service for state of the art customer service.
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	</div>
</template>

<script>
	import Navbar from "@/components/dashboard/Navbar.vue";
	import Sidebar from "@/components/dashboard/Sidebar.vue";
	import Footer from "@/components/Footer.vue";

	import MaterialsListAdmin from "@/components/dashboard/materials/MaterialsListAdmin.vue";
	import Search from "@/components/Search.vue";

	export default {
		name: "Materials",
		components: { Sidebar, Navbar, Footer, MaterialsListAdmin, Search },
		data() {
			return {
				searchText: ""
			};
		}
	};
</script>
