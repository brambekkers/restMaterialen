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
            return state.users ? state.users : [];
        },
        editors(state) {
            return state.users.length ? state.users.filter((u) => u.editor) : [];
        },
        admins(state) {
            return state.users.length ? state.users.filter((u) => u.admin) : [];
        },
        isEditor(state) {
            return state.user && (state.user.editor || state.user.admin);
        },
        isAdmin(state) {
            return state.user && state.user.admin;
        }
    },
    mutations: {
        admins(state, val) {
            state.user.length ? state.users.filter((u) => u.admin) : [];
        }
    },
    actions: {
        userListner({ state, getters, commit, dispatch }) {
            getters.auth.onAuthStateChanged(async (user) => {
                state.user = user ? await dispatch("getUserFromDatabase", user) : null;
                if (user) {
                    const idTokenResult = await getters.auth.currentUser.getIdTokenResult(true);
                    state.user.admin = idTokenResult.claims.admin;
                    state.user.editor = idTokenResult.claims.editor;

                    if (idTokenResult.claims.admin) {
                        dispatch("paymentListner");
                    }

                    // Update user to set last time login
                    state.user.metadata = getters.auth.currentUser.metadata;

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
            try {
                const { user } = await getters.auth.createUserWithEmailAndPassword(userInput.email, userInput.password);
                await dispatch("updateUser", userInput);
                return user;
            } catch (err) {
                throw err;
            }
        },

        async addUserAsAdmin({ getters }, userInput) {
            return new Promise(async (resolve, reject) => {
                try {
                    const addUserFunction = await getters.functions.httpsCallable("addUser");
                    const newUser = await addUserFunction(userInput);
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        },
        async updateUser({ getters }, userInput) {
            return new Promise(async (resolve, reject) => {
                try {
                    const user = getters.auth.currentUser;
                    const updatedUser = await getters.db.doc(`Users/${user.uid}`).set({
                        firstName: userInput.firstName ? userInput.firstName : "",
                        lastName: userInput.lastName ? userInput.lastName : "",
                        email: userInput.email,
                        studentNumber: userInput.studentNumber ? userInput.studentNumber : "",
                        class: userInput.class ? userInput.class : "",
                        study: userInput.study ? userInput.study : "",
                        id: user.uid,
                        editor: userInput.editor ? userInput.editor : null,
                        admin: userInput.admin ? userInput.admin : null,
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
        async deleteUser({ getters, dispatch }, id) {
            try {
                await dispatch("reauthenticateAlert");
                await getters.db.doc(`Users/${id}`).delete();
                await getters.auth.currentUser.delete();
                return true;
            } catch (err) {
                throw err;
            }
        },
        async deleteUserAsAdmin({ getters }, id) {
            return new Promise(async (resolve, reject) => {
                try {
                    const deleteUserFunction = await getters.functions.httpsCallable("deleteUser");
                    await deleteUserFunction({ id });
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        },
        async getUsers({ state, getters }) {
            if (getters.db) {
                getters.db.collection("Users").onSnapshot((users) => {
                    state.users = {};

                    users.forEach((user) => {
                        console.log(user);
                        state.users[user.id] = user.data();
                    });
                });
            }
        },
        async getUserName({ getters }, id) {
            let user = null;
            if (getters.users && Object.values(getters.users).length) {
                user = getters.users[id];
            } else {
                console.log("ik heb nog geen users");
                const doc = await getters.db.doc(`Users/${id}`).get();
                user = doc.data();
            }
            return user ? `${user.firstName} ${user.lastName}` : "Onbekende gebruiker";
        },
        changeRole({ getters }, obj) {
            return new Promise(async (resolve, reject) => {
                try {
                    const changeRoleFunction = await getters.functions.httpsCallable("changeRole");
                    const res = await changeRoleFunction(obj);
                    resolve(res);
                } catch (err) {
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
