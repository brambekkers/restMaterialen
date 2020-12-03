import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/functions";
import "firebase/performance";
import firebaseConfig from "@/assets/config/firebaseConfig";

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
    mutations: {},
    actions: {
        addFirebase({ state, dispatch }) {
            state.firebase = firebase.initializeApp(firebaseConfig);
            state.firebase.performance();
            state.firebase.analytics();
            dispatch("materialsListner");
            dispatch("userListner");
            dispatch("optionListner");
        }
    }
};
