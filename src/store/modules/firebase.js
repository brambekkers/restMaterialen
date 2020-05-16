import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
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
        }
    },
    mutations: {},
    actions: {
        addFirebase({ state, dispatch }) {
            state.firebase = firebase.initializeApp(firebaseConfig);
            dispatch("materialsListner");
            dispatch("userListner");
        }
    }
};
