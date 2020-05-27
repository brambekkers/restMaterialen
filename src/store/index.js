import Vue from "vue";
import Vuex from "vuex";

// Modules
import firebase from "@/store/modules/firebase";
import users from "@/store/modules/users";
import materials from "@/store/modules/materials";
import notification from "@/store/modules/notification";
import reservation from "@/store/modules/reservation";

// other
import { nanoid } from "nanoid";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: { users, firebase, materials, notification, reservation },
    state: {},
    getters: {},
    mutations: {},
    actions: {
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
