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
            return state.firebase.firestore();
        },
        auth(state) {
            return state.firebase.auth();
        },
        storage(state) {
            return state.firebase.storage();
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
