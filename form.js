
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

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var email = user.email;
    alert("Active user " + email);
  } else {
    alert("No Active user Found");
  }
});

function signIn() {
var email = document.getElementById("email");
var password = document.getElementById("password");
const promise = auth.signInWithEmailAndPassword(
			email.value, password.value);
promise.catch((e) => alert(e.message));
	alert("SignIn Successful");
}

// SignOut
function signOut() {
auth.signOut();
alert("SignOut Successfully from System");
}


// Delete user account
async function deleteAccount() {
  var user = firebase.auth().currentUser;
  if (user) {
    var followingList = [];
    var reqList = [];
    var pendingList = [];
    alert("Fetching user data...");
    try {
      // Fetch following list
      const followingSnapshot = await firestore.collection("f@*aDe12").doc(user.uid).collection("F").get();
      followingSnapshot.forEach(function(doc) {
        followingList.push(doc.id);
      });

      alert("Fetching friend requests...");
      // Fetch friend requests
      const reqSnapshot = await firestore.collection("rZ89&*DE").doc(user.uid).collection("F").get();
      reqSnapshot.forEach(function(doc) {
        reqList.push(doc.id);
      });

      alert("Fetching pending requests...");
      // Fetch pending requests
      const pendingSnapshot = await firestore.collection("rZ89&*DE").doc(user.uid).collection("P").get();
      pendingSnapshot.forEach(function(doc) {
        pendingList.push(doc.id);
      });

      alert("Deleting user data...");
      // Delete user data
      const deleteUserDataResult = await firestore.collection("C99!2cz$").doc(user.uid).delete();

      alert("Deleting seenBy document...");
      // Delete seenBy document
      const deleteSeenByResult = await firestore.collection("S45!dc&*").doc(user.uid).collection("F").doc(user.uid).delete();

      alert("Deleting seenBy list...");
      // Delete seenBy list
      const seenBySnapshot = await firestore.collection("S45!dc&*").doc(user.uid).collection("F").get();
      var seenByPromises = [];
      seenBySnapshot.forEach(function(doc) {
        seenByPromises.push(doc.ref.delete());
      });
      await Promise.all(seenByPromises);

      alert("Deleting friend list...");
      // Delete friend list
      const friendListSnapshot = await firestore.collection("f@*aDe12").doc(user.uid).collection("F").get();
      var friendListPromises = [];
      friendListSnapshot.forEach(function(doc) {
        friendListPromises.push(doc.ref.delete());
      });
      await Promise.all(friendListPromises);

      alert("Deleting friend requests...");
      // Delete friend requests
      const friendReqSnapshot = await firestore.collection("rZ89&*DE").doc(user.uid).collection("F").get();
      var friendReqPromises = [];
      friendReqSnapshot.forEach(function(doc) {
        friendReqPromises.push(doc.ref.delete());
      });
      await Promise.all(friendReqPromises);

      alert("Deleting pending requests...");
      // Delete pending requests
      const pendingReqSnapshot = await firestore.collection("rZ89&*DE").doc(user.uid).collection("P").get();
      var pendingReqPromises = [];
      pendingReqSnapshot.forEach(function(doc) {
        pendingReqPromises.push(doc.ref.delete());
      });
      await Promise.all(pendingReqPromises);

      alert("Deleting user document and username...");
      // Delete user document and username
      const userDoc = await firestore.collection("U34dlo@%").doc(user.uid).get();
      if (userDoc.exists) {
        var username = userDoc.data().u;
        const deleteUsernameResult = await firestore.collection("Us789!z#").doc(username).delete();
        const deleteUserDocResult = await firestore.collection("U34dlo@%").doc(user.uid).delete();

        alert("Deleting user storage...");
        // Delete user storage
        var storageRef = storage.ref("c7689/" + user.uid + "/c");
        const deleteUserStorageResult = await storageRef.delete();

        alert("Deleting friends' storage...");
        // Delete friends' storage
        var friendsStoragePromises = [];
        followingList.forEach(function(friendId) {
          var friendStorageRef = storage.ref("c7689/" + friendId + "/c");
          friendsStoragePromises.push(friendStorageRef.delete());
        });
        await Promise.all(friendsStoragePromises);

        alert("Deleting profile storage...");
        // Delete profile storage
        var profileStorageRef = storage.ref("u43a2/" + user.uid + "/c7689");
        const deleteProfileStorageResult = await profileStorageRef.delete();

        alert("Deleting user account...");
        // Delete user account
        const deleteUserAccountResult = await user.delete();

        finishAccountDeletion();
      } else {
        finishAccountDeletion();
      }
    } catch (error) {
      console.error("Error deleting user account:", error);
    }
  } else {
    console.log("No user found.");
  }
}



// Additional steps after account deletion
function finishAccountDeletion() {
 // Close the app (you may need to implement this)
  alert("Account Deleted Successfully");
  // Redirect to desired page or perform other actions
}


