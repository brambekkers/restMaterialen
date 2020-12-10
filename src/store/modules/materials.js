import QRCode from "qrcode";

export default {
    state: {
        materials: null
    },
    getters: {
        materials: (s) => s.materials
    },
    mutations: {
        unit({}, string) {
            if (string) {
                const unit = string.split(" ")[1];
                if (unit === "deel") return "delen";
                return unit;
            }
            return "eenheden";
        }
    },
    actions: {
        // Material listner
        // updates all materials
        async materialsListner({ state, getters }) {
            getters.db.collection("Materials").onSnapshot((materials) => {
                state.materials = [];
                materials.forEach((material) => {
                    state.materials.push({
                        ...material.data(),
                        id: material.id
                    });
                });
            });
        },
        addMaterial({ dispatch, getters }, material) {
            return new Promise(async (resolve, reject) => {
                try {
                    const docRef = await getters.db.collection("Materials").add(material);
                    const qr = await dispatch("createQRcode", docRef.id);
                    await getters.db.doc(`Materials/${docRef.id}`).update({ qr });
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        },
        updateMaterial({ getters }, material) {
            return new Promise(async (resolve, reject) => {
                if (material && material.id) {
                    try {
                        await getters.db.doc(`Materials/${material.id}`).set(material);
                        resolve(true);
                    } catch (error) {
                        reject(error);
                    }
                } else {
                    reject();
                }
            });
        },
        deleteMaterial({ getters, dispatch }, material) {
            return new Promise(async (resolve, reject) => {
                // remove images from database
                for (const image of material.images) {
                    dispatch("removeImage", image.path);
                }

                try {
                    // remove material from database
                    getters.db
                        .collection("Materials")
                        .doc(material.id)
                        .delete();
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        },
        createQRcode({}, id) {
            return new Promise(async (resolve, reject) => {
                try {
                    const options = {
                        errorCorrectionLevel: "H",
                        type: "image/jpeg",
                        quality: 1,
                        margin: 3
                    };
                    const qrCode = await QRCode.toDataURL(`https://restmaterialen.web.app/libary/${id}`, options);
                    resolve(qrCode);
                } catch (error) {
                    reject(error);
                }
            });
        }
        // checkMaterial({ dispatch }, material) {
        //     if (material.reservations && Object.values(material.reservations).length) {
        //         // Check if material has reservations
        //         for (const reservation of Object.values(material.reservations)) {
        //             // Check if the reservation has been paid
        //             // If not go further
        //             if (!reservation.payID) {
        //                 const now = new Date()
        //                 const expireDay = reservation.expireDate.toDate()
        //                 // Check if expireDay has been expired
        //                 if (now > expireDay) {
        //                     // Remove reservation
        //                     dispatch('removeReservation', reservation)
        //                 }
        //             }
        //         }
        //     }
        // }
    }
};
