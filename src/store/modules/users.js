export default {
    state: {
        user: null
    },
    getters: {
        user(state) {
            return state.user;
        }
    },
    mutations: {},
    actions: {
        userListner({ state, getters }) {
            getters.auth.onAuthStateChanged((user) => {
                state.user = user ? user : null;
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
                    const ref = getters.db.collection("Users").doc(user.uid);
                    const res = await ref.set({
                        firstName: userInput.firstName,
                        lastName: userInput.lastName,
                        email: userInput.email,
                        id: user.uid,
                        metadata: user.metadata
                    });
                    resolve(res);
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
};
