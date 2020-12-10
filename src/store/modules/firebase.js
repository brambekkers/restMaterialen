import firebaseConfig from "@/assets/config/firebaseConfig";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/functions";
import "firebase/performance";

firebase.initializeApp(firebaseConfig);

export default {
    state: {
        firebase: null
    },
    getters: {
        db(state) {
            return state.firebase ? state.firebase.firestore() : null;
        },
        auth(state) {
            return state.firebase ? state.firebase.auth() : null;
        },
        storage(state) {
            return state.firebase ? state.firebase.storage() : null;
        },
        functions(state) {
            return state.firebase ? state.firebase.functions() : null;
        }
    },
    mutations: {
        firebase: (state, firebase) => (state.firebase = firebase)
    },
    actions: {
        async addFirebase({ state, commit, dispatch }) {
            if (firebase.apps.length === 0) {
                commit("firebase", await firebase.initializeApp(firebaseConfig));
            } else {
                commit("firebase", firebase.apps[0]);
            }

            state.firebase.performance();
            state.firebase.analytics();
            dispatch("materialsListner");
            dispatch("userListner");
            dispatch("optionListner");
            return true;
        }
    }
};

firebase.getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            unsubscribe();
            resolve(user);
        }, reject);
    });
};
