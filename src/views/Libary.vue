<template>
    <div class="main-content">
        <Header />
        <div class="container">
            <div class="row">
                <div class="col-3 ml-auto">
                    <Search :searchText.sync="searchText" />
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title">Restmaterialen database</h5>
                    <p class="card-category">Geen filter</p>
                </div>
                <div class="card-body">
                    <MaterialsList v-if="materials" />
                    <Loading v-else />
                </div>
                <div class="card-footer">
                    <hr />
                    <LastTimeUpdated />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Search from "@/components/Search.vue";
import LastTimeUpdated from "@/components/LastTimeUpdated.vue";

import MaterialsList from "@/components/libary/MaterialsList.vue";

import Loading from "@/components/Loading.vue";

export default {
    name: "Libary",
    data() {
        return {
            searchText: ""
        };
    },
    components: {
        Header,
        Search,
        MaterialsList,
        LastTimeUpdated,
        Loading
    },
    computed: {
        searchTags() {
            this.searchText.split(" ");
        },
        materials() {
            return this.$store.getters.materials;
        }
    }
};
</script>
