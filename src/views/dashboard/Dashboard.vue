<template>
    <div class="content row d-flex justify-content-center">
        <div class="col-xxl-9 col-xxl-6">
            <div class="row">
                <AdminInfo />
                <TotalMaterials />
                <TotalReservations />
            </div>
        </div>
    </div>
</template>

<script>
// Panels
import AdminInfo from "@/components/dashboard/dashboardItems/AdminInfo.vue";
import TotalMaterials from "@/components/dashboard/dashboardItems/TotalMaterials.vue";
import TotalReservations from "@/components/dashboard/dashboardItems/TotalReservations.vue";

export default {
    name: "Dashboard",
    components: {
        AdminInfo,
        TotalMaterials,
        TotalReservations
    }
};
</script>
