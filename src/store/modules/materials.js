export default {
    state: {
        materials: null
    },
    getters: {
        materials(state) {
            return state.materials;
        }
    },
    mutations: {},
    actions: {
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
        addMaterial({ getters }, material) {
            return new Promise((resolve, reject) => {
                getters.db
                    .collection("Materials")
                    .add(material)
                    .then(() => {
                        resolve(true);
                    })
                    .catch((error) => {
                        resolve(error);
                    });
            });
        },
        updateMaterial({ getters }, material) {
            return new Promise(async (resolve, reject) => {
                try {
                    await getters.db.doc(`Materials/${material.id}`).set(material);
                    resolve(true);
                } catch (error) {
                    reject(error);
                }
            });
        },
        deleteMaterial({ getters, dispatch }, material) {
            return new Promise(async (resolve, reject) => {
                // remove images from database
                for (const image of material.images) {
                    dispatch("removeImage", image.path);
                }
                // remove material from database
                getters.db
                    .collection("Materials")
                    .doc(material.id)
                    .delete();
            });
        }
    }
};
