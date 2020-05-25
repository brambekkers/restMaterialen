import Vue from "vue";
import router from "@/router";
import * as firebase from "firebase";

export default {
    state: {
        user: null,
        users: [],
        roles: {
            editors: [],
            admins: []
        }
    },
    getters: {
        user(state) {
            return state.user;
        },
        users(state) {
            return state.users;
        },
        editors(state) {
            return state.roles.editors;
        },
        admins(state) {
            return state.roles.admins;
        },
        role() {
            return state.user.role;
        },
        isEditor(state) {
            return state.user && (state.user.role === "editor" || state.user.role === "admin");
        },
        isAdmin(state) {
            return state.user && state.user.role === "admin";
        }
    },
    mutations: {},
    actions: {
        userListner({ state, getters, commit, dispatch }) {
            getters.auth.onAuthStateChanged(async (user) => {
                state.user = user ? await dispatch("getUserFromDatabase", user) : null;
                if (user) {
                    const role = await dispatch("getRole");
                    Vue.set(state.user, "role", role);
                }
            });
        },
        async getUserFromDatabase({ getters }, user) {
            return new Promise(async (resolve, reject) => {
                try {
                    const doc = await getters.db.doc(`Users/${user.uid}`).get();
                    resolve(doc.data());
                } catch (err) {
                    console.log(err);
                    reject(null);
                }
            });
        },
        async getRole({ getters, state }) {
            return new Promise(async (resolve, reject) => {
                try {
                    await getters.db.doc(`Roles/admin`).get();
                    resolve("admin");
                } catch (error) {
                    try {
                        await getters.db.doc(`Roles/editor`).get();
                        resolve("editor");
                    } catch (error) {
                        resolve("user");
                    }
                }
            });
        },
        async login({ getters }, { email, password }) {
            return new Promise(async (resolve, reject) => {
                try {
                    const user = await getters.auth.signInWithEmailAndPassword(email, password);
                    resolve(true);
                } catch (error) {
                    reject(error);
                }
            });
        },
        logout({ getters, dispatch }) {
            getters.auth.signOut();
            dispatch("notification", {
                style: "success",
                msg: {
                    title: "Uitgelogd!",
                    text: "Je bent succesvol uitgelogd!"
                }
            });
        },
        resetPassword({ getters }, email) {
            return new Promise(async (resolve, reject) => {
                try {
                    await getters.auth.sendPasswordResetEmail(email);
                    resolve(true);
                } catch (err) {
                    reject(err);
                }
            });
        },
        async addUser({ getters, dispatch }, userInput) {
            return new Promise(async (resolve, reject) => {
                try {
                    const { user, error } = await dispatch("newUserAuth", userInput);
                    const res = await dispatch("newUserDB", { user, userInput });
                    resolve(res);
                } catch (err) {
                    reject(err);
                }
            });
            v;
        },
        async deleteUser({ getters, dispatch }, id) {
            return new Promise(async (resolve, reject) => {
                try {
                    getters.db.doc(`Users/${id}`).delete();
                    getters.auth.currentUser.delete();
                } catch (err) {
                    reject(err);
                }
            });
            v;
        },
        async newUserAuth({ getters }, { email, password }) {
            return new Promise(async (resolve, reject) => {
                try {
                    const res = await getters.auth.createUserWithEmailAndPassword(email, password);
                    resolve(res);
                } catch (err) {
                    reject(err);
                }
            });
        },
        async newUserDB({ getters }, { user, userInput }) {
            return new Promise(async (resolve, reject) => {
                try {
                    const res = getters.db.doc(`Users/${user.uid}`).set({
                        firstName: userInput.firstName,
                        lastName: userInput.lastName,
                        email: userInput.email,
                        id: user.uid,
                        metadata: {
                            creationTime: user.metadata.creationTime,
                            lastSignInTime: user.metadata.lastSignInTime
                        }
                    });
                    resolve(res);
                } catch (err) {
                    reject(err);
                }
            });
        },
        async getUsers({ state, getters }) {

            if (getters.db) {
                getters.db.collection("Users").onSnapshot((users) => {
                    Vue.set(state, "users", []);

                    users.forEach(user => {
                        state.users.push(user.data());
                    });
                });
            }
        },
        async getRoles({ state, getters }) {
            if (getters.db) {
                getters.db
                    .collection("Roles")
                    .doc("editor")
                    .onSnapshot((editors) => {
                        state.roles.editors = editors.data().users;
                    });
                getters.db
                    .collection("Roles")
                    .doc("admin")
                    .onSnapshot((admins) => {
                        state.roles.admins = admins.data().users;
                    });
            }
        },
        addRole({ getters }, { id, type }) {
            getters.db.doc(`Roles/${type}`).update({ users: firebase.firestore.FieldValue.arrayUnion(id) });
        },
        removeRole({ getters }, { id, type }) {
            getters.db.doc(`Roles/${type}`).update({ users: firebase.firestore.FieldValue.arrayRemove(id) });
        }
    }
};
