<template>
    <div class="col-sm-6 col-xl-3">
        <div class="card card-stats">
            <div class="card-body">
                <div class="row">
                    <div class="col-5 col-md-4">
                        <div class="icon-big text-center icon-warning">
                            <i class="fas fa-clipboard-list text-info"></i>
                        </div>
                    </div>
                    <div class="col-7 col-md-8">
                        <div class="numbers">
                            <p class="card-category">Aantal reserveringen</p>
                            <p class="card-title">{{ totalReservations }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <hr />
                <div class="stats">
                    <i class="fa fa-calculator"></i>
                    {{ (totalReservations / materials.length).toFixed(2) }}
                    gemiddeld per materiaal
                </div>
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
            return this.$store.getters.materials ? this.$store.getters.materials : [];
        },
        totalReservations() {
            let amount = 0;
            if (this.materials) {
                for (const material of this.materials) {
                    if (material.reservations) {
                        for (const i in material.reservations) {
                            amount++;
                        }
                    }
                }
            }
            return amount;
        }
    }
};
</script>
