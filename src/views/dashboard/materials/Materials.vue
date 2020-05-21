<template>
	<div class="wrapper">
		<Sidebar />
		<div class="main-panel h-100">
			<Navbar :title="$route.name" />
			<div class="content">
				<div class="row justify-content-center">
					<div class="col-xxl-8 col-xxxl-5">
						<div class="card">
							<div class="card-header">
								<h4 class="card-title">
									Materialen in de database
								</h4>
							</div>
							<div class="card-body">
								<div class="row">
									<div class="col-md-5 col-lg-5 col-xl-3 ml-auto">
										<Search :searchText.sync="searchText" />
									</div>
								</div>
								<div class="card border">
									<MaterialsListAdmin />
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

import MaterialsListAdmin from "@/components/dashboard/components/MaterialsListAdmin.vue";
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
