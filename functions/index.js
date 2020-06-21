// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.\
const functions = require("firebase-functions");

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require("firebase-admin");
admin.initializeApp();

const auth = admin.auth();
const db = admin.firestore();

// Saves a message to the Firebase Realtime Database but sanitizes the text by removing swearwords.
exports.addUser = functions.https.onCall((data, context) => {
    return new Promise((resolve, reject) => {
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
    });
});
