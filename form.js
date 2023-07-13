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

  const deleteFollowingList = (followingList) => {
    const deletePromises = followingList.map((friendId) => {
      return deleteUserList("f@*aDe12", friendId);
    });

    return Promise.all(deletePromises);
  };

  const deleteReqList = (reqList) => {
    const deletePromises = reqList.map((reqId) => {
      return deleteUserList("rZ89&*DE", reqId);
    });

    return Promise.all(deletePromises);
  };

  const deletePendingReqList = (pendingList) => {
    const deletePromises = pendingList.map((reqId) => {
      return deleteUserList("rZ89&*DE", reqId);
    });

    return Promise.all(deletePromises);
  };

  const deleteSeenBy = (followingList) => {
    const ref3 = firebase.firestore().collection("S45!dc&*")
      .doc(firebaseUser.uid)
      .collection("F")
      .doc(firebaseUser.uid);

    return ref3.get().then((documentSnapshot) => {
      if (documentSnapshot.exists) {
        return ref3.delete().then(() => deleteSeenByList(followingList));
      } else {
        return deleteSeenByList(followingList);
      }
    });
  };

  const deleteSeenByList = (followingList) => {
    if (followingList.length > 0) {
      const deletePromises = followingList.map((seenBy) => {
        const ref3 = firebase.firestore().collection("S45!dc&*")
          .doc(firebaseUser.uid)
          .collection("F")
          .doc(seenBy);

        return ref3.get().then((documentSnapshot) => {
          if (documentSnapshot.exists) {
            return ref3.delete();
          }
        });
      });

      return Promise.all(deletePromises);
    } else {
      return Promise.resolve();
    }
  };

  const deleteFriend = (followingList) => {
    if (followingList.length > 0) {
      const deletePromises = followingList.map((friendId) => {
        const ref3 = firebase.firestore().collection("f@*aDe12")
          .doc(firebaseUser.uid)
          .collection("F")
          .doc(friendId);

        return ref3.delete();
      });

      return Promise.all(deletePromises);
    } else {
      return Promise.resolve();
    }
  };

  const deleteFriendList = (followingList) => {
    if (followingList.length > 0) {
      const deletePromises = followingList.map((friendId) => {
        const ref3 = firebase.firestore().collection("f@*aDe12")
          .doc(friendId)
          .collection("F")
          .doc(firebaseUser.uid);

        return ref3.delete();
      });

      return Promise.all(deletePromises);
    } else {
      return Promise.resolve();
    }
  };

  const deleteReq = (reqList) => {
    if (reqList.length > 0) {
      const deletePromises = reqList.map((reqId) => {
        const ref5 = firebase.firestore().collection("rZ89&*DE")
          .doc(firebaseUser.uid)
          .collection("F")
          .doc(reqId);

        return ref5.delete();
      });

      return Promise.all(deletePromises);
    } else {
      return Promise.resolve();
    }
  };

  const deleteReqList = (reqList) => {
    if (reqList.length > 0) {
      const deletePromises = reqList.map((reqId) => {
        const ref5 = firebase.firestore().collection("rZ89&*DE")
          .doc(reqId)
          .collection("F")
          .doc(firebaseUser.uid);

        return ref5.delete();
      });

      return Promise.all(deletePromises);
    } else {
      return Promise.resolve();
    }
  };

  const deletePendingReq = (pendingList) => {
    if (pendingList.length > 0) {
      const deletePromises = pendingList.map((reqId) => {
        const ref5 = firebase.firestore().collection("rZ89&*DE")
          .doc(firebaseUser.uid)
          .collection("P")
          .doc(reqId);

        return ref5.delete();
      });

      return Promise.all(deletePromises);
    } else {
      return Promise.resolve();
    }
  };

  const deletePendingReqList = (pendingList) => {
    if (pendingList.length > 0) {
      const deletePromises = pendingList.map((reqId) => {
        const ref5 = firebase.firestore().collection("rZ89&*DE")
          .doc(reqId)
          .collection("F")
          .doc(firebaseUser.uid);

        return ref5.delete();
      });

      return Promise.all(deletePromises);
    } else {
      return Promise.resolve();
    }
  };

  const deleteUserId = () => {
    const db = firebase.firestore();
    const docRef = db.collection("U34dlo@%").doc(firebaseUser.uid);

    return docRef.get().then((documentSnapshot) => {
      if (documentSnapshot.exists) {
        const username = documentSnapshot.get("u");
        const ref7 = db.collection("Us789!z#").doc(username);

        return ref7.delete().then(() => {
          const ref8 = db.collection("U34dlo@%").doc(firebaseUser.uid);
          return ref8.delete().then(() => deleteStorage());
        });
      } else {
        return deleteStorage();
      }
    });
  };

  const deleteStorage = () => {
    const storageRef = firebase.storage().ref("c7689").child(firebaseUser.uid).child("c");

    return storageRef.delete().then(() => {
      const deletePromises = followingList.map((reactedList) => {
        const storageReference = firebase.storage().ref("c7689").child(reactedList).child("c");
        return storageReference.delete();
      });

      return Promise.all(deletePromises);
    }).then(() => {
      const profRef = firebase.storage().ref("u43a2").child(firebaseUser.uid).child("c7689");
      return profRef.delete();
    }).then(() => finalStep());
  };

  const finalStep = () => {
    const firebaseUser = firebase.auth().currentUser;

    if (firebaseUser) {
      return firebaseUser.delete()
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
    const followingList = [];
    const reqList = [];
    const pendingList = [];

    checkFollowing()
      .then(() => checkReq())
      .then(() => checkPending())
      .then(() => deleteSeenBy(followingList))
      .catch((error) => {
        console.log("An error occurred", error);
      });
  } else {
    console.log("User is not logged in");
  }
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
