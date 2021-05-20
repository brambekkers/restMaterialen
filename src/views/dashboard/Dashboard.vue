<template>
	<div class="content row d-flex justify-content-center px-0 px-md-3  ">
		<div class="col-xxl-9 col-xxl-6">
			<div class="row">
				<AdminInfo />
			</div>
			<div class="row">
				<TotalMaterials />
				<TotalReservations />
				<TotalPayments />
			</div>
		</div>
	</div>
</template>

<script>
	// Panels
	import AdminInfo from "@/components/dashboard/dashboardItems/AdminInfo.vue";
	import TotalMaterials from "@/components/dashboard/dashboardItems/TotalMaterials.vue";
	import TotalReservations from "@/components/dashboard/dashboardItems/TotalReservations.vue";
	import TotalPayments from "@/components/dashboard/dashboardItems/TotalPayments.vue";

	export default {
		name: "Dashboard",
		components: {
			AdminInfo,
			TotalMaterials,
			TotalReservations,
			TotalPayments
		}
	};
</script>
