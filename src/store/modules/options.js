import Vue from "vue";

export default {
    state: {
        reservation: {
            reservationExpireDays: 3
        }
    },
    getters: {
        reservationOptions(state) {
            return state.reservation;

        },
        reservationExpireDays(state) {
            return state.reservation.reservationExpireDays;
        },

    },
    mutations: {},
    actions: {
        optionListner({ getters, state }) {
            getters.db.doc("Options/reservation").onSnapshot((doc) => {
                Vue.set(state, "reservation", doc.data());
            });
        },
        updateOptions({ getters }, { type, options }) {
            return new Promise(async (resolve, reject) => {
                try {
                    await getters.db.doc(`Options/${type}`).set(options);
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        }
    }
};
