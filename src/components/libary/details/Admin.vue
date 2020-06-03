<template>
    <div class="card" v-if="material">
        <div class="card-header">
            <h4 class="card-title mb-0">Beheer</h4>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-md-6 col-xl-4">
                    <img class="fluid-img" :src="material.qr" />
                </div>
                <div class="col-md-6 col-xl-8">
                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Materiaal ID</label>
                                <input type="text" v-model="material.id" class="form-control border-input" disabled />
                            </div>
                        </div>
                        <div class="col-6"></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 mt-4">
                    <h6>Reserveringen</h6>
                    <table class="table mx-0 table-striped border-top mb-0 table-hover border">
                        <thead class>
                            <tr>
                                <th class="pl-4">#</th>
                                <th>Gebruiker</th>
                                <th>Hoeveelheid</th>
                                <th class="text-center">Betaalt</th>
                                <th class="text-right pr-4">Acties</th>
                            </tr>
                        </thead>
                        <tbody>
                            <ReservationAdmin v-for="(reservation, i) of material.reservations" :key="i" :reservation="reservation" :material="material" :index="i" />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ReservationAdmin from "@/components/dashboard/reservations/ReservationAdmin.vue";

export default {
    props: ["material"],
    components: { ReservationAdmin }
};
</script>
