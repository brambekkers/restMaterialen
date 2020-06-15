<template>
    <div class="content">
        <div class="row justify-content-center">
            <div class="col-xxl-12 col-xxxl-8">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Materialen in de database</h4>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-5 col-lg-5 col-xl-3 ml-auto">
                                <Search :searchText.sync="searchText" />
                            </div>
                        </div>
                        <ul class="nav nav-pills nav-pills-primary nav-pills-icons justify-content-center" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" data-toggle="tab" href="#active" role="tablist">
                                    <i class="now-ui-icons objects_umbrella-13"></i>
                                    Actief
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href="#reservated" role="tablist">
                                    <i class="now-ui-icons shopping_shop"></i>
                                    Gereserveerd
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href="#archive" role="tablist">
                                    <i class="now-ui-icons ui-2_settings-90"></i>
                                    Archief
                                </a>
                            </li>
                        </ul>
                        <div class="tab-content tab-space tab-subcategories">
                            <div class="tab-pane active" id="active">
                                <div class="card border">
                                    <MaterialsListAdmin :materials="activeMaterials" v-if="activeMaterials" />
                                </div>
                            </div>
                            <div class="tab-pane" id="reservated">
                                <div class="card border" v-if="reservatedMaterials">
                                    <MaterialsListAdmin :materials="reservatedMaterials" />
                                </div>
                                <p v-else>Er staat geen materiaal open wat volledig is gereserveerd maar nog niet compleet is afgerond.</p>
                            </div>
                            <div class="tab-pane" id="archive">
                                Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas.
                                <br />
                                <br />Dynamically innovate resource-leveling customer service for state of the art customer service.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MaterialsListAdmin from "@/components/dashboard/materials/MaterialsListAdmin.vue";
import Search from "@/components/Search.vue";

export default {
    name: "Materials",
    components: { MaterialsListAdmin, Search },
    data() {
        return {
            searchText: ""
        };
    },
    computed: {
        materials() {
            return this.$store.getters.materials;
        },
        activeMaterials() {
            if (this.materials) return this.materials.filter((m) => m.unitAvalible);
        },
        reservatedMaterials() {
            if (this.materials) return this.materials.filter((m) => m.unitAvalible === 0);
        }
    }
};
</script>
