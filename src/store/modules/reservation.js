export default {
    state: {
    },
    getters: {

    },
    mutations: {},
    actions: {
        reservate({ getters }, { id, amount }) {
            return new Promise((resolve, reject) => {
                let material
                console.log('new reservation started')
                console.log('id:', id)

                // get the material
                if (getters.materials) {
                    material = getters.materials.filter(item => item.id === id)[0];
                } else {
                    reject('no connection width database')
                }

                // check if material amouont is avalible
                if (material.unitAvalible > 0) {

                } else {
                    reject('Material not avalible')
                }

                // make reservation in database
                const uid = getters.auth.currentUser.uid
                getters.db
                    .doc(`Reservations/${id}/${uid}/reservations`)
                    .set({
                        id, amount, user: uid
                    })
                    .then(() => {
                        resolve(true);
                    })
                    .catch((error) => {
                        resolve(error);
                    });

                // update material
            })
        }
    }
};
