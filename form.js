// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later,
// measurementId is optional
var firebaseConfig = {
apiKey: "AIzaSyCD9V2lPNIgJRBhwVLtzqvNN7hwGEueagA",
authDomain: "friendlinksocialapp.firebaseapp.com",
projectId: "friendlinksocialapp",
storageBucket: "friendlinksocialapp.appspot.com",
messagingSenderId: "638805104947",
appId: "1:638805104947:android:05dd31296f5b3aeef10646",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

// Signup function
function signUp() {
var email = document.getElementById("email");
var password = document.getElementById("password");

const promise = auth.createUserWithEmailAndPassword(
	email.value,
	password.value
);
promise.catch((e) => alert(e.message));
alert("SignUp Successfully");
}

// SignIN function
function signIn() {
var email = document.getElementById("email");
var password = document.getElementById("password");
const promise = auth.signInWithEmailAndPassword(
			email.value, password.value);
promise.catch((e) => alert(e.message));
}

// SignOut
function signOut() {
auth.signOut();
alert("SignOut Successfully from System");
}

function deleteUser() {
    const deleteUserList = (collectionName, documentId) => {
        return firebase.firestore().collection(collectionName).doc(documentId).delete();
    };

    const deleteStorageFile = (storagePath) => {
        const storageRef = firebase.storage().ref(storagePath);
        return storageRef.delete();
    };

    const deleteFollowingList = () => {
        const followingList = [];
        const query = firebase.firestore().collection("f@*aDe12")
            .doc(firebaseUser.uid)
            .collection("F");

        return query.get()
            .then((snapshot) => {
                snapshot.forEach((documentSnapshot) => {
                    followingList.push(documentSnapshot.id);
                });

                const deletePromises = followingList.map((friendId) => {
                    return deleteUserList("f@*aDe12", friendId);
                });

                return Promise.all(deletePromises);
            });
    };

    const deleteReqList = () => {
        const reqList = [];
        const query = firebase.firestore().collection("rZ89&*DE")
            .doc(firebaseUser.uid)
            .collection("F");

        return query.get()
            .then((snapshot) => {
                snapshot.forEach((documentSnapshot) => {
                    reqList.push(documentSnapshot.id);
                });

                const deletePromises = reqList.map((reqId) => {
                    return deleteUserList("rZ89&*DE", reqId);
                });

                return Promise.all(deletePromises);
            });
    };

    const deletePendingReqList = () => {
        const pendingList = [];
        const query = firebase.firestore().collection("rZ89&*DE")
            .doc(firebaseUser.uid)
            .collection("P");

        return query.get()
            .then((snapshot) => {
                snapshot.forEach((documentSnapshot) => {
                    pendingList.push(documentSnapshot.id);
                });

                const deletePromises = pendingList.map((reqId) => {
                    return deleteUserList("rZ89&*DE", reqId);
                });

                return Promise.all(deletePromises);
            });
    };

    const deleteUserId = () => {
        const userIdRef = firebase.firestore().collection("U34dlo@%").doc(firebaseUser.uid);

        return userIdRef.get()
            .then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    const username = documentSnapshot.get("u");
                    const usernameRef = firebase.firestore().collection("Us789!z#").doc(username);

                    return usernameRef.delete()
                        .then(() => {
                            const userRef = firebase.firestore().collection("U34dlo@%").doc(firebaseUser.uid);
                            return userRef.delete();
                        })
                        .then(() => deleteStorage());
                } else {
                    return deleteStorage();
                }
            });
    };

    const deleteStorage = () => {
        const deleteStorageFilePromises = [
            deleteStorageFile(`c7689/${firebaseUser.uid}/c`),
            ...followingList.map((reactedList) => deleteStorageFile(`c7689/${reactedList}/c`)),
            deleteStorageFile(`u43a2/${firebaseUser.uid}/c7689`)
        ];

        return Promise.all(deleteStorageFilePromises)
            .then(() => finalStep());
    };

    const finalStep = () => {
        const user = firebase.auth().currentUser;

        if (user) {
            const email = user.email;

            // Delete the email
            const userCredential = firebase.auth.EmailAuthProvider.credential(email, null);
            return user.reauthenticateWithCredential(userCredential)
                .then(() => {
                    return user.unlink(firebase.auth.EmailAuthProvider.PROVIDER_ID);
                })
                .then(() => {
                    console.log("Email Deleted Successfully");

                    // Delete the user account
                    return user.delete();
                })
                .then(() => {
                    console.log("Account Deleted Successfully");
                })
                .catch((error) => {
                    console.log("Account Deletion Failed", error);
                });
        } else {
            console.log("User is not logged in");
        }
    };

    const firebaseUser = firebase.auth().currentUser;

    if (firebaseUser) {
        checkFollowing()
            .then(() => checkReq())
            .then(() => checkPending())
            .then(() => deleteSeenBy())
            .catch((error) => {
                console.log("An error occurred", error);
            });
    } else {
        console.log("User is not logged in");
    }
}

function checkPending() {
    const pendingList = [];
    const query = firebase.firestore().collection("rZ89&*DE")
        .doc(firebaseUser.uid)
        .collection("P");

    return query.get()
        .then((snapshot) => {
            snapshot.forEach((documentSnapshot) => {
                pendingList.push(documentSnapshot.id);
            });

            return Promise.resolve();
        });
}

function checkReq() {
    const reqList = [];
    const query = firebase.firestore().collection("rZ89&*DE")
        .doc(firebaseUser.uid)
        .collection("F");

    return query.get()
        .then((snapshot) => {
            snapshot.forEach((documentSnapshot) => {
                reqList.push(documentSnapshot.id);
            });

            return Promise.resolve();
        });
}

function checkFollowing() {
    const followingList = [];
    const query = firebase.firestore().collection("f@*aDe12")
        .doc(firebaseUser.uid)
        .collection("F");

    return query.get()
        .then((snapshot) => {
            snapshot.forEach((documentSnapshot) => {
                followingList.push(documentSnapshot.id);
            });

            return Promise.resolve();
        });
}

const firebaseUser = firebase.auth().currentUser;

if (firebaseUser) {
    deleteUserId()
        .then(() => checkFollowing())
        .then(() => checkReq())
        .then(() => checkPending())
        .then(() => deleteSeenBy())
        .catch((error) => {
            console.log("An error occurred", error);
        });
} else {
    console.log("User is not logged in");
}


// Active user to homepage
firebase.auth().onAuthStateChanged((user) => {
if (user) {
	var email = user.email;
	alert("Active user " + email);
} else {
	alert("No Active user Found");
}
});
