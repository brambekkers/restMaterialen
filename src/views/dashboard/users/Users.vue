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
                                    Users in de database
                                </h4>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-3 ml-auto">
                                        <Search />
                                    </div>
                                </div>

                                <div class="card border ">
                                    <Userlist />
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

import Userlist from "@/components/dashboard/components/UserList.vue";
import Search from "@/components/Search.vue";

export default {
    name: "Users",
    components: { Sidebar, Navbar, Footer, Userlist, Search },
    computed: {
        users() {
            return this.$store.getters.users;
        }
    },
    mounted() {
        setTimeout(() => {
            if (!this.users.lenght) {
                this.$store.dispatch("getUsers");
            }
        }, 500);
    }
};
</script>
