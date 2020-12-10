import Vue from "vue";
import firebase from "firebase/app";

export default {
    state: {},
    getters: {
        userReservations(state, getters) {
            const id = getters.auth.currentUser.uid;
            return getters.materials.filter((m) => m.reservations && m.reservations[id]).map((m) => m.reservations[id]);
        }
    },
    mutations: {},
    actions: {
        reservate({ getters, dispatch }, obj) {
            return new Promise(async (resolve, reject) => {
                try {
                    const material = await dispatch("materialToReservate", obj.id);
                    await dispatch("isAmountAvalible", { material, amount: obj.amount });
                    await dispatch("reservationInDatabase", { material, userAmount: obj.userAmount });
                    await dispatch("updateMaterialAmount", { material, amount: -obj.amount });
                    resolve("Reservation success");
                } catch (error) {
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
        reservationInDatabase({ getters, dispatch }, { material, userAmount }) {
            return new Promise(async (resolve, reject) => {
                const uid = getters.auth.currentUser.uid;

                try {
                    // Get reservations
                    const reservations = material.reservations ? material.reservations : {};

                    // Update reservation
                    const reservationDate = firebase.firestore.Timestamp.now().toDate();
                    const expireDate = firebase.firestore.Timestamp.now().toDate();

                    reservations[uid] = {
                        id: material.id,
                        amount: userAmount,
                        uid: uid,
                        payID: null,
                        reservationDate,
                        expireDate: new Date(expireDate.setDate(reservationDate.getDate() + getters.reservationExpireDays))
                    };
                    material.reservations = reservations;

                    // Update reservation to database
                    await dispatch("updateMaterial", material);

                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        },
        removeReservationInDatabase({ getters, dispatch }, reservation) {
            return new Promise(async (resolve, reject) => {
                try {
                    // Get material
                    const material = await dispatch("materialToReservate", reservation.id);

                    // delete reservation from material (localy)
                    delete material.reservations[reservation.uid];

                    // Update reservation to database
                    await dispatch("updateMaterial", material);

                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        },
        updateMaterialAmount({ dispatch }, { material, amount }) {
            return new Promise(async (resolve, reject) => {
                try {
                    if (material.unitAvalible + amount <= material.unitAmount) {
                        material.unitAvalible += amount;
                    }
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
