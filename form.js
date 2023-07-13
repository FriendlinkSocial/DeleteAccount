
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
    
      // Fetch following list
      var followingRef = await db.collection("f@*aDe12").doc(user.uid).collection("F").get();
      followingRef.forEach(function (doc) {
        var data = doc.data();
        followingList.push(data);
	        alert("Inside Try");
      });
      console.log(followingList);

      alert("Fetching friend requests...");
      // Fetch friend requests
      var reqRef = await db.collection("rZ89&*DE").doc(user.uid).collection("F").get();
      reqRef.forEach(function (doc) {
        var data = doc.data();
        reqList.push(data);
      });
      console.log(reqList);

      alert("Fetching pending requests...");
      // Fetch pending requests
      var pendingRef = await db.collection("rZ89&*DE").doc(user.uid).collection("P").get();
      pendingRef.forEach(function (doc) {
        var data = doc.data();
        pendingList.push(data);
      });
      console.log(pendingList);

      alert("Deleting user data...");
      // Delete user data
      await db.collection("C99!2cz$").doc(user.uid).delete();

      alert("Deleting seenBy document...");
      // Delete seenBy document
      await db.collection("S45!dc&*").doc(user.uid).collection("F").doc(user.uid).delete();

      alert("Deleting seenBy list...");
      // Delete seenBy list
      const seenBySnapshot = await db.collection("S45!dc&*").doc(user.uid).collection("F").get();
      seenBySnapshot.forEach(async function (doc) {
        await doc.ref.delete();
      });

      alert("Deleting friend list...");
      // Delete friend list
      const friendListSnapshot = await db.collection("f@*aDe12").doc(user.uid).collection("F").get();
      friendListSnapshot.forEach(async function (doc) {
        await doc.ref.delete();
      });

      alert("Deleting friend requests...");
      // Delete friend requests
      const friendReqSnapshot = await db.collection("rZ89&*DE").doc(user.uid).collection("F").get();
      friendReqSnapshot.forEach(async function (doc) {
        await doc.ref.delete();
      });

      alert("Deleting pending requests...");
      // Delete pending requests
      const pendingReqSnapshot = await db.collection("rZ89&*DE").doc(user.uid).collection("P").get();
      pendingReqSnapshot.forEach(async function (doc) {
        await doc.ref.delete();
      });

      alert("Deleting user document and username...");
      // Delete user document and username
      const userDoc = await db.collection("U34dlo@%").doc(user.uid).get();
      if (userDoc.exists) {
        var username = userDoc.data().u;
        await db.collection("Us789!z#").doc(username).delete();
        await db.collection("U34dlo@%").doc(user.uid).delete();

        alert("Deleting user storage...");
        // Delete user storage
        var storageRef = storage.ref("c7689/" + user.uid + "/c");
        await storageRef.delete();

        alert("Deleting friends' storage...");
        // Delete friends' storage
        for (const friendId of followingList) {
          var friendStorageRef = storage.ref("c7689/" + friendId + "/c");
          await friendStorageRef.delete();
        }

        alert("Deleting profile storage...");
        // Delete profile storage
        var profileStorageRef = storage.ref("u43a2/" + user.uid + "/c7689");
        await profileStorageRef.delete();

        alert("Deleting user account...");
        // Delete user account
        await user.delete();

        finishAccountDeletion();
      } else {
        finishAccountDeletion();
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


