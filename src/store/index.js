import Vuex from "vuex";

// Modules
import firebase from "@/store/modules/firebase";
import users from "@/store/modules/users";
import materials from "@/store/modules/materials";
import notification from "@/store/modules/notification";
import reservation from "@/store/modules/reservation";
import payment from "@/store/modules/payment";
import options from "@/store/modules/options";

// other
import { nanoid } from "nanoid";

export default Vuex.createStore({
    modules: { users, firebase, materials, notification, reservation, options, payment },
    state: {
        sidebarOpen: false
    },
    getters: {
        sidebarOpen(state) {
            return state.sidebarOpen;
        },
    },
    mutations: {
        sidebarOpen(state, val) {
            state.sidebarOpen = val;
        },
    },
    actions: {

        uploadImage({ getters }, blobImage) {
            return new Promise(async (resolve, reject) => {
                const path = `images/materials/${nanoid()}`;
                const ref = getters.storage.ref().child(path);
                await ref.put(blobImage);
                resolve(path);
            });
        },
        getImageUrl({ getters }, storagePath) {
            return new Promise(async (resolve, reject) => {
                const interval = setInterval(async () => {
                    const newPath = `${storagePath}_500x500`
                    const ref = getters.storage.ref().child(newPath);
                    ref.getDownloadURL().then((url) => {
                        clearInterval(interval);
                        resolve({ url, path: newPath });
                    })
                }, 1000);

            });
        },
        removeImage({ getters }, path) {
            return new Promise(async (resolve, reject) => {
                const ref = getters.storage.ref().child(path);
                ref.delete().then(() => {
                    resolve(true);
                });
            });
        },

    }
});
