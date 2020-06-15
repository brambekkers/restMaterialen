<template>
    <div class="content h-75">
        <div class="row justify-content-center">
            <div class="col-xxl-8 col-xxxl-5">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Reservations in de database</h4>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-3 ml-auto">
                                <Search />
                            </div>
                        </div>

                        <div class="card">
                            <ReservationsList />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
import Search from "@/components/Search.vue";
import ReservationsList from "@/components/dashboard/reservations/ReservationsList.vue";

export default {
    name: "Reservations",
    components: {
        Search,
        Loading,
        ReservationsList
    }
};
</script>
