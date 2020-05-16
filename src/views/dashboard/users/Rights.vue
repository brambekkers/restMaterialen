<template>
    <div class="wrapper">
        <Sidebar />
        <div class="main-panel h-100">
            <Navbar :title="$route.name" />
            <div class="content">
                <div class="row">
                    <div class="col-6">
                        <div class="card mt-5">
                            <div class="card-header">
                                <h3 class="card-title text-center">
                                    Beheerders
                                </h3>
                            </div>
                            <div class="card-body">
                                <div class="form-group">
                                    <label for="inputState">State</label>
                                    <select id="inputState" class="form-control">
                                        <option selected>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                                <hr />
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

export default {
    name: "Rights",
    components: { Sidebar, Navbar, Footer },
    computed: {
        users() {
            return this.$store.getters.users;
        }
    },
    mounted() {
        this.$store.dispatch("getAllUsers");
    }
};
</script>
