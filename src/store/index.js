import Vue from "vue";
import Vuex from "vuex";

import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import firebaseConfig from "@/assets/config/firebaseConfig";

import { nanoid } from "nanoid";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        firebase: null,
        materials: null,
        user: null
    },
    getters: {
        db(state) {
            return state.firebase.firestore();
        },
        auth(state) {
            return state.firebase.auth();
        },
        storage(state) {
            return state.firebase.storage();
        },
        materials(state) {
            return state.materials;
        },
        user(state) {
            return state.user;
        }
    },
    mutations: {},
    actions: {
        addFirebase({ state, dispatch }) {
            state.firebase = firebase.initializeApp(firebaseConfig);
            dispatch("addMaterialsListner");
            dispatch("addUserListner");
        },
        addUserListner({ state, getters }) {
            getters.auth.onAuthStateChanged((user) => {
                state.user = user ? user : null;
            });
        },
        async login({ getters }, { email, password }) {
            return new Promise(async (resolve, reject) => {
                const user = await getters.auth
                    .signInWithEmailAndPassword(email, password)
                    .catch((error) => {
                        resolve({ login: false, ...error });
                    });

                resolve({ login: true, ...user });
            });
        },
        logout({ getters }) {
            getters.auth.signOut();
        },
        async addMaterialsListner({ state, getters }) {
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
    },
    modules: {}
});
