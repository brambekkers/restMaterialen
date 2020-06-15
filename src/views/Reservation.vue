<template>
    <div class="main-content align-items-center d-flex">
        <div class="container">
            <div class="row">
                <div class="col-lg-5 col-md-5 ml-auto">
                    <ReservationInfo />
                </div>
                <div class="col-lg-4 col-md-6 mr-auto">
                    <ReservationForm />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ReservationInfo from "@/components/reservation/ReservationInfo";
import ReservationForm from "@/components/reservation/ReservationForm";

export default {
    name: "MaterialReservation",
    components: {
        ReservationInfo,
        ReservationForm
    }
};
</script>
