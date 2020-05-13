<template>
    <div class="wrapper">
        <Sidebar />
        <div class="main-panel h-100">
            <Navbar :title="$route.name" />
            <div class="content">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">
                                    Materialen in de database
                                </h4>
                            </div>
                            <div class="card-body">
                                <div class="card ">
                                    <ul class="list-group list-group-flush">
                                        <Material
                                            v-for="material of materials"
                                            :key="material.name"
                                            :material="material"
                                        />
                                    </ul>
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

import Material from "@/components/dashboard/components/Material.vue";

export default {
    name: "Materials",
    components: { Sidebar, Navbar, Footer, Material },
    computed: {
        materials() {
            return this.$store.getters.materials;
        }
    },
    mounted() {}
};
</script>
