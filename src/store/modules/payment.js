export default {
    state: {},
    getters: {},
    mutations: {},
    actions: {
        registerPayment({ getters, dispatch }, reservation) {
            return new Promise(async (resolve, reject) => {
                try {
                    const paymentDate = new Date();
                    const payment = await getters.db.collection(`Payments`).add({
                        paymentDate: paymentDate,
                        materialID: reservation.id,
                        userID: reservation.uid,
                        amount: reservation.amount,
                        registeredBy: getters.auth.currentUser.uid
                    });
                    // Get material
                    const material = await dispatch("materialToReservate", reservation.id);

                    // Update PayID from material (localy)
                    material.reservations[reservation.uid].payID = payment.id;

                    // Update reservation to database
                    await dispatch("updateMaterial", material);
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        },
        removePayment({ getters, dispatch }, reservation) {
            return new Promise(async (resolve, reject) => {
                try {
                    await getters.db.doc(`Payments/${reservation.payID}`).delete();
                    // Get material
                    const material = await dispatch("materialToReservate", reservation.id);
                    // Update PayID from material (localy)
                    material.reservations[reservation.uid].payID = null;
                    // Update reservation to database
                    await dispatch("updateMaterial", material);
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        },
        checkIfPaymentExist({ getters }, id) {
            return new Promise(async (resolve, reject) => {
                try {
                    const doc = await getters.db.doc(`Payments/${id}`).get();
                    resolve(doc.exists);
                } catch {
                    reject();
                }
            });
        }
    }
};
