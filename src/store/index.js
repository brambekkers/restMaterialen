import Vue from "vue";
import Vuex from "vuex";

import * as firebase from "firebase";
import "firebase/firestore";
import firebaseConfig from "@/assets/config/firebaseConfig";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        firebase: null,
        materials: null
    },
    getters: {
        db(state) {
            return state.firebase.firestore();
        },
        materials(state) {
            return state.materials;
        }
    },
    mutations: {},
    actions: {
        addFirebase({ state, dispatch }) {
            state.firebase = firebase.initializeApp(firebaseConfig);
            dispatch("addMaterialsListner");
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
            return new Promise(async (resolve, reject) => {
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
        }
    },
    modules: {}
});
