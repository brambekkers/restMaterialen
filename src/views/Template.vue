<template>
    <div class="wrapper">
        <Sidebar />
        <div class="main-panel h-100">
            <Navbar />
            <div class="content">
                <div class="row">
                    <div class="col-md-12">
                        <h3 class="description">Your content here</h3>
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
export default {
    name: "Home",
    components: { Sidebar, Navbar, Footer }
};
</script>
