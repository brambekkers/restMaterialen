import Vue from "vue";
import Vuex from "vuex";

// Modules
import firebase from "@/store/modules/firebase";
import users from "@/store/modules/users";

// other
import { nanoid } from "nanoid";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: { users, firebase },
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
        uploadImage({ getters }, blobImage) {
            return new Promise(async (resolve, reject) => {
                const path = `images/materials/${nanoid()}`;
                const ref = getters.storage.ref().child(path);
                const img = await ref.put(blobImage);
                const url = await ref.getDownloadURL();
                resolve({ url, path });
            });
        },
        removeImage({ getters }, path) {
            return new Promise(async (resolve, reject) => {
                const ref = getters.storage.ref().child(path);
                ref.delete().then(() => {
                    resolve(true);
                });
            });
        }
    }
});
