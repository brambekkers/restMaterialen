export default {
    state: {
        user: null,
        users: []
    },
    getters: {
        user(state) {
            return state.user;
        },
        users(state) {
            return state.users;
        }
    },
    mutations: {},
    actions: {
        userListner({ state, getters, dispatch }) {
            getters.auth.onAuthStateChanged(async (user) => {
                state.user = user ? await dispatch("getUserFromDatabase", user) : null;
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
                const user = await getters.auth.signInWithEmailAndPassword(email, password).catch((error) => {
                    resolve({ login: false, ...error });
                });

                resolve({ login: true, ...user });
            });
        },
        logout({ getters }) {
            getters.auth.signOut();
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
        async getAllUsers({ state, getters }) {
            if (getters.db) {
                getters.db.collection("Users").onSnapshot((users) => {
                    state.users = [];
                    users.forEach((user) => {
                        state.users.push(user.data());
                    });
                });
            }
        }
    }
};
