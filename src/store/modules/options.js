import router from "@/router";

// boostrap notify
import "bootstrap-notify";
// Sweet Alert 2
import Swal from "sweetalert2";

export default {
    state: {
        reservationExpireDays: 3
    },
    getters: {
        reservationExpireDays(state) {
            return state.reservationExpireDays;
        }
    },
    mutations: {},
    actions: {}
};
