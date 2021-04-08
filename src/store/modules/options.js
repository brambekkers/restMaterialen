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
        }
    },
    mutations: {
        reservationOptions(state, val) {
            return (state.reservation = val);
        }
    },
    actions: {
        optionListner({ getters, commit }) {
            getters.db.doc("Options/reservation").onSnapshot((doc) => {
                commit("reservationOptions", doc.data());
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
