<template>
    <div class="col-sm-6 col-xl-3">
        <div class="card card-stats">
            <div class="card-body ">
                <div class="row">
                    <div class="col-5 col-md-4">
                        <div class="icon-big text-center icon-warning">
                            <i class="fas fa-calculator text-danger"></i>
                        </div>
                    </div>
                    <div class="col-7 col-md-8">
                        <div class="numbers">
                            <p class="card-category">Aantal materialen</p>
                            <p class="card-title">{{ materials.length }}</p>
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer ">
                <hr />
                <LastTimeUpdated />
            </div>
        </div>
    </div>
</template>

<script>
import LastTimeUpdated from "@/components/LastTimeUpdated.vue";

export default {
    components: { LastTimeUpdated },
    computed: {
        materials() {
            return this.$store.getters.materials;
        }
    }
};
</script>
