import Vue from "vue";
import * as firebase from "firebase";

export default {
    state: {
        reservations: [],
        userReservations: []
    },
    getters: {
        reservations(state) {
            return state.reservations;
        },
        userReservations(state) {
            return state.userReservations;
        }
    },
    mutations: {},
    actions: {
        async getReservations({ state, getters }) {
            if (getters.db) {
                Vue.set(state, "reservations", []);
                for (const material of getters.materials) {
                    const path = `Reservations/${material.id}/reservations`;
                    getters.db.collection(path).onSnapshot((reservations) => {
                        reservations.forEach((reservation) => {
                            state.reservations.push(reservation.data());
                        });
                    });
                }
            }
        },
        async getUserReservations({ state, getters, dispatch }) {
            if (getters.db) {
                const reservations = [];
                for (const material of getters.materials) {
                    try {
                        const reservation = await dispatch("getReservation", material.id);
                        if (reservation) reservations.push(reservation);
                    } catch (error) {}
                }
                Vue.set(state, "userReservations", reservations);
            }
        },
        getReservation({ getters }, id) {
            return new Promise(async (resolve, reject) => {
                if (getters.db) {
                    try {
                        const reservation = await getters.db.doc(`Reservations/${id}/reservations/${getters.user.id}`).get();
                        resolve(reservation.data());
                    } catch (error) {
                        reject(error);
                    }
                }
            });
        },
        reservate({ getters, dispatch }, obj) {
            return new Promise(async (resolve, reject) => {
                try {
                    const material = await dispatch("materialToReservate", obj.id);
                    await dispatch("isAmountAvalible", { material, amount: obj.amount });
                    await dispatch("reservationInDatabase", obj);
                    await dispatch("updateMaterialAmount", { material, amount: -obj.amount });
                    resolve("Reservation success");
                } catch (error) {
                    console.log(error);
                    reject(error);
                }
            });
        },
        materialToReservate({ getters }, id) {
            return new Promise((resolve, reject) => {
                // get the material
                if (getters.materials) {
                    resolve(getters.materials.filter((item) => item.id === id)[0]);
                } else {
                    reject("no connection width database");
                }
            });
        },
        isAmountAvalible({}, { material, amount }) {
            return new Promise((resolve, reject) => {
                if (material.unitAvalible - amount >= 0) {
                    resolve();
                } else {
                    reject("Material not avalible");
                }
            });
        },
        reservationInDatabase({ getters }, { id, userAmount }) {
            return new Promise(async (resolve, reject) => {
                const uid = getters.auth.currentUser.uid;
                const path = `Reservations/${id}/reservations/${uid}`;

                // update to database
                try {
                    const reservationDate = new Date();
                    const expireDate = new Date();
                    await getters.db.doc(path).set({
                        id,
                        amount: userAmount,
                        uid: uid,
                        paid: false,
                        reservationDate: reservationDate,
                        expireDate: new Date(expireDate.setDate(reservationDate.getDate() + getters.reservationExpireDays))
                    });
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        },
        removeReservationInDatabase({ getters }, reservation) {
            return new Promise(async (resolve, reject) => {
                const uid = getters.auth.currentUser.uid;
                const path = `Reservations/${reservation.id}/reservations/${reservation.uid}`;

                // update to database
                try {
                    await getters.db.doc(path).delete();
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        },
        updateMaterialAmount({ dispatch }, { material, amount }) {
            return new Promise(async (resolve, reject) => {
                try {
                    material.unitAvalible += amount;
                    await dispatch("updateMaterial", material);
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        },
        removeReservation({ dispatch }, reservation) {
            return new Promise(async (resolve, reject) => {
                try {
                    const material = await dispatch("materialToReservate", reservation.id);
                    await dispatch("removeReservationInDatabase", reservation);
                    await dispatch("updateMaterialAmount", { material, amount: reservation.amount });
                    resolve("Remove Reservation succesfully");
                } catch (error) {
                    console.log(error);
                    reject(error);
                }
            });
        }
    }
};
