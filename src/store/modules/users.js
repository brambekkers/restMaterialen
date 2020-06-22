import Vue from "vue";
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
            return state.users.length ? state.users.filter((u) => u.editor) : [];
        },
        admins(state) {
            return state.users.length ? state.users.filter((u) => u.admin) : [];
        },
        role() {
            return state.user.role;
        },
        isEditor(state) {
            return state.user && (state.user.editor || state.user.admin);
        },
        isAdmin(state) {
            return state.user && state.user.admin;
        }
    },
    mutations: {},
    actions: {
        userListner({ state, getters, commit, dispatch }) {
            getters.auth.onAuthStateChanged(async (user) => {
                const dbUser = user ? await dispatch("getUserFromDatabase", user) : null;
                Vue.set(state, "user", dbUser);
                if (user) {
                    const idTokenResult = await getters.auth.currentUser.getIdTokenResult(true);
                    Vue.set(state.user, "admin", idTokenResult.claims.admin);
                    Vue.set(state.user, "editor", idTokenResult.claims.editor);

                    // Update user to set last time login
                    Vue.set(state.user, "metadata", getters.auth.currentUser.metadata);
                    dispatch("updateUser", state.user);
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
                    const { user } = await getters.auth.createUserWithEmailAndPassword(userInput.email, userInput.password);
                    await dispatch("updateUser", userInput);
                    resolve(user);
                } catch (err) {
                    reject(err);
                }
            });
        },
        async addUserAsAdmin({ getters }, userInput) {
            return new Promise(async (resolve, reject) => {
                try {
                    const addUserFunction = await getters.functions.httpsCallable("addUser");
                    const newUser = await addUserFunction(userInput);
                    resolve();
                } catch (err) {
                    console.log(err);
                    reject(err);
                }
            });
        },
        async updateUser({ getters }, userInput) {
            return new Promise(async (resolve, reject) => {
                try {
                    const user = getters.auth.currentUser;
                    const updatedUser = await getters.db.doc(`Users/${user.uid}`).set({
                        firstName: userInput.firstName,
                        lastName: userInput.lastName,
                        email: userInput.email,
                        studentNumber: userInput.studentNumber,
                        class: userInput.class,
                        study: userInput.study,
                        id: user.uid,
                        editor: userInput.editor,
                        admin: userInput.admin,
                        metadata: {
                            creationTime: user.metadata.creationTime,
                            lastSignInTime: user.metadata.lastSignInTime
                        }
                    });
                    resolve(updatedUser);
                } catch (err) {
                    reject(err);
                }
            });
        },
        async deleteUser({ getters }, id) {
            return new Promise(async (resolve, reject) => {
                try {
                    await getters.db.doc(`Users/${id}`).delete();
                    await getters.auth.currentUser.delete();
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        },
        async getUsers({ state, getters }) {
            if (getters.db) {
                getters.db.collection("Users").onSnapshot((users) => {
                    Vue.set(state, "users", []);

                    users.forEach((user) => {
                        state.users.push(user.data());
                    });
                });
            }
        },
        changeRole({ getters }, obj) {
            return new Promise(async (resolve, reject) => {
                try {
                    const changeRoleFunction = await getters.functions.httpsCallable("changeRole");
                    const res = await changeRoleFunction(obj);
                    console.log(res);
                    resolve(res);
                } catch (err) {
                    console.log(err);
                    reject(err);
                }
            });
        },
        addRole({ getters }, { id, type }) {
            getters.db.doc(`Roles/${type}`).update({ users: firebase.firestore.FieldValue.arrayUnion(id) });
        },
        removeRole({ getters }, { id, type }) {
            getters.db.doc(`Roles/${type}`).update({ users: firebase.firestore.FieldValue.arrayRemove(id) });
        }
    }
};
