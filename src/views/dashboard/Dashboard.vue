<template>
    <div class="wrapper">
        <Sidebar />
        <div class="main-panel h-100">
            <Navbar :title="$route.name" />
            <div class="content row d-flex justify-content-center">
                <div class="col-xxl-9 col-xxl-6">
                    <div class="row">
                        <AdminInfo />
                        <TotalMaterials />
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

// Panels
import AdminInfo from "@/components/dashboard/components/AdminInfo.vue";
import TotalMaterials from "@/components/dashboard/components/TotalMaterials.vue";

export default {
    name: "Home",
    components: { Sidebar, Navbar, Footer, AdminInfo, TotalMaterials }
};
</script>
