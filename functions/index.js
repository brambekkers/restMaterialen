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

// Delete users from db en auth
exports.deleteUser = functions.https.onCall(({ id }, context) => {
    return new Promise((resolve, reject) => {
        if (context.auth.token.admin) {
            // Delete database
            db.doc(`Users/${id}`)
                .delete()
                .then(() => {
                    // Delete Auth
                    auth.deleteUser(id)
                        .then(() => {
                            resolve("Successfully deleted user");
                        })
                        .catch((error) => {
                            reject(new functions.https.HttpsError("error", `Error deleting user auth: ${error}`));
                        });
                })
                .catch((error) => {
                    reject(new functions.https.HttpsError("error", `Error deleting user database: ${error}`));
                });
        } else {
            reject(new functions.https.HttpsError("unauthenticated", "Request not authorized. User must be a admin to fulfull request."));
        }
    });
});

exports.scheduledFunction = functions.pubsub.schedule("every 3 hours").onRun(async (context) => {
    const snapshot = await db.collection("Materials").get();
    const materialsArray = snapshot.docs.map((doc) => doc.data());

    for (const material of materialsArray) {
        // Check if material has reservations
        if (material.reservations && Object.values(material.reservations).length) {
            // Loop trough reservations
            for (const reservation of Object.values(material.reservations)) {
                // Check if the reservation has been paid
                // If not go further
                if (!reservation.payID) {
                    const now = new Date();
                    const expireDay = reservation.expireDate.toDate();
                    // Check if expireDay has been expired
                    if (now > expireDay) {
                        // Update material amount
                        // add the amount reservated to the amount avalible
                        db.collection("Materials")
                            .doc(material.id)
                            .update({
                                unitAvalible: material.unitAvalible + reservation.amount
                            });

                        // remove reservation from material
                        // update the reservations
                        delete material.reservations[reservation.uid];
                        db.collection("Materials")
                            .doc(material.id)
                            .update({
                                reservations: material.reservations
                            });
                    }
                }
            }
        }
    }

    return null;
});
