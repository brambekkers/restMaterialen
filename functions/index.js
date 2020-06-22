// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.\
const functions = require("firebase-functions");

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require("firebase-admin");
admin.initializeApp();

const auth = admin.auth();
const db = admin.firestore();

// Add user to Auth and make database item.
exports.addUser = functions.https.onCall((data, context) => {
    return new Promise((resolve, reject) => {
        if (context.auth.token.admin) {
            auth.createUser({
                email: data.email,
                password: data.password
            })
                .then((user) => {
                    db.doc(`Users/${user.uid}`)
                        .set({
                            firstName: data.firstName,
                            lastName: data.lastName,
                            email: data.email,
                            studentNumber: data.studentNumber,
                            class: data.class,
                            study: data.study,
                            id: user.uid,
                            metadata: {
                                creationTime: user.metadata.creationTime,
                                lastSignInTime: user.metadata.lastSignInTime ? user.metadata.lastSignInTime : null
                            }
                        })
                        .then(() => resolve())
                        .catch((error) => {
                            reject(error);
                        });
                })
                .catch((error) => {
                    reject(error);
                });
        } else {
            reject(new functions.https.HttpsError("unauthenticated", "Request not authorized. User must be a admin to fulfull request."));
        }
    });
});

// changeRole
exports.changeRole = functions.https.onCall(({ id, admin, editor }, context) => {
    return new Promise((resolve, reject) => {
        if (context.auth.token.admin) {
            // Set custom claim
            auth.setCustomUserClaims(id, {
                admin,
                editor
            })
                .then(() => {
                    db.doc(`Users/${id}`)
                        .update({ admin, editor })
                        .then(() => {
                            resolve("Request fulfilled!");
                        });
                })
                .catch((err) => {
                    reject(err);
                });
        } else {
            reject(new functions.https.HttpsError("unauthenticated", "Request not authorized. User must be a admin to fulfull request."));
        }
    });
});
