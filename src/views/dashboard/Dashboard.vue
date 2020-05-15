<template>
    <div class="wrapper">
        <Sidebar />
        <div class="main-panel h-100">
            <Navbar :title="$route.name" />
            <div class="content">
                <div class="row">
                    <adminInfo />
                    <totalMaterials />
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
import adminInfo from "@/components/dashboard/components/adminInfo.vue";
import totalMaterials from "@/components/dashboard/components/totalMaterials.vue";

export default {
    name: "Home",
    components: { Sidebar, Navbar, Footer, adminInfo, totalMaterials }
};
</script>
