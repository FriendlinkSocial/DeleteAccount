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
let firebaseUser;

// Signup function
function signUp() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      alert("SignUp Successful");
    })
    .catch((error) => {
      alert(error.message);
    });
}

// SignIN function
function signIn() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      alert("SignIn Successful");
    })
    .catch((error) => {
      alert(error.message);
    });
}

// SignOut
function signOut() {
  auth.signOut()
    .then(() => {
      alert("SignOut Successful");
    })
    .catch((error) => {
      alert(error.message);
    });
}

function checkPending() {
  const query = firebase
    .firestore()
    .collection("rZ89&*DE")
    .doc(firebaseUser.uid)
    .collection("P");

  return query.get().then((snapshot) => {
    const pendingList = [];

    snapshot.forEach((documentSnapshot) => {
      pendingList.push(documentSnapshot.id);
    });

    return pendingList;
  });
}

function checkReq() {
  const query = firebase
    .firestore()
    .collection("rZ89&*DE")
    .doc(firebaseUser.uid)
    .collection("F");

  return query.get().then((snapshot) => {
    const reqList = [];

    snapshot.forEach((documentSnapshot) => {
      reqList.push(documentSnapshot.id);
    });

    return reqList;
  });
}

function checkFollowing() {
  const query = firebase
    .firestore()
    .collection("f@*aDe12")
    .doc(firebaseUser.uid)
    .collection("F");

  return query.get().then((snapshot) => {
    const followingList = [firebaseUser.uid];

    snapshot.forEach((documentSnapshot) => {
      followingList.push(documentSnapshot.id);
    });

    return followingList;
  });
}

function deleteUser() {
  const followingList = [];
  const reqList = [];
  const pendingList = [];

  checkFollowing()
    .then((followingList) => {
      return checkReq().then((reqList) => {
        return checkPending().then((pendingList) => {
          return Promise.all([
            deleteSeenBy(followingList),
            deleteFriend(followingList),
            deleteFriendList(followingList),
            deleteReq(reqList),
            deleteReqList(reqList),
            deletePendingReq(pendingList),
            deletePendingReqList(pendingList),
            deleteUserId(),
          ]);
        });
      });
    })
    .then(() => {
      console.log("Account Deleted Successfully");
    })
    .catch((error) => {
      console.log("An error occurred", error);
    });
}

function deleteSeenBy(followingList) {
  const ref3 = firebase
    .firestore()
    .collection("S45!dc&*")
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
}

function deleteSeenByList(followingList) {
  if (followingList.length > 0) {
    const deletePromises = followingList.map((seenBy) => {
      const ref3 = firebase
        .firestore()
        .collection("S45!dc&*")
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
}

function deleteFriend(followingList) {
  if (followingList.length > 0) {
    const deletePromises = followingList.map((friendId) => {
      const ref3 = firebase
        .firestore()
        .collection("f@*aDe12")
        .doc(firebaseUser.uid)
        .collection("F")
        .doc(friendId);

      return ref3.delete();
    });

    return Promise.all(deletePromises);
  } else {
    return Promise.resolve();
  }
}

function deleteFriendList(followingList) {
  if (followingList.length > 0) {
    const deletePromises = followingList.map((friendId) => {
      const ref3 = firebase
        .firestore()
        .collection("f@*aDe12")
        .doc(friendId)
        .collection("F")
        .doc(firebaseUser.uid);

      return ref3.delete();
    });

    return Promise.all(deletePromises);
  } else {
    return Promise.resolve();
  }
}

function deleteReq(reqList) {
  if (reqList.length > 0) {
    const deletePromises = reqList.map((reqId) => {
      const ref5 = firebase
        .firestore()
        .collection("rZ89&*DE")
        .doc(firebaseUser.uid)
        .collection("F")
        .doc(reqId);

      return ref5.delete();
    });

    return Promise.all(deletePromises);
  } else {
    return Promise.resolve();
  }
}

function deleteReqList(reqList) {
  if (reqList.length > 0) {
    const deletePromises = reqList.map((reqId) => {
      const ref5 = firebase
        .firestore()
        .collection("rZ89&*DE")
        .doc(reqId)
        .collection("F")
        .doc(firebaseUser.uid);

      return ref5.delete();
    });

    return Promise.all(deletePromises);
  } else {
    return Promise.resolve();
  }
}

function deletePendingReq(pendingList) {
  if (pendingList.length > 0) {
    const deletePromises = pendingList.map((reqId) => {
      const ref5 = firebase
        .firestore()
        .collection("rZ89&*DE")
        .doc(firebaseUser.uid)
        .collection("P")
        .doc(reqId);

      return ref5.delete();
    });

    return Promise.all(deletePromises);
  } else {
    return Promise.resolve();
  }
}

function deletePendingReqList(pendingList) {
  if (pendingList.length > 0) {
    const deletePromises = pendingList.map((reqId) => {
      const ref5 = firebase
        .firestore()
        .collection("rZ89&*DE")
        .doc(reqId)
        .collection("F")
        .doc(firebaseUser.uid);

      return ref5.delete();
    });

    return Promise.all(deletePromises);
  } else {
    return Promise.resolve();
  }
}

function deleteUserId() {
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
}

function deleteStorage() {
  const storageRef = firebase
    .storage()
    .ref("c7689")
    .child(firebaseUser.uid)
    .child("c");

  return storageRef.delete()
    .then(() => {
      const deletePromises = followingList.map((reactedList) => {
        const storageReference = firebase
          .storage()
          .ref("c7689")
          .child(reactedList)
          .child("c");
        return storageReference.delete();
      });

      return Promise.all(deletePromises);
    })
    .then(() => {
      const profRef = firebase
        .storage()
        .ref("u43a2")
        .child(firebaseUser.uid)
        .child("c7689");
      return profRef.delete();
    })
    .then(() => finalStep());
}

function finalStep() {
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
}

// Active user to homepage
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    firebaseUser = user;
    var email = user.email;
    alert("Active user " + email);
  } else {
    alert("No Active user Found");
  }
});
