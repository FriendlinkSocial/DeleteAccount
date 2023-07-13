
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
function deleteAccount() {
  var user = firebase.auth().currentUser;

  if (user) {
    var followingList = [];
    var reqList = [];
    var pendingList = [];

    alert("Fetching user data...");

    // Fetch following list
    firestore.collection("f@*aDe12").doc(user.uid).collection("F").get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          followingList.push(doc.id);
        });
      })
      .then(function() {
        alert("Fetching friend requests...");

        // Fetch friend requests
        firestore.collection("rZ89&*DE").doc(user.uid).collection("F").get()
          .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              reqList.push(doc.id);
            });
          })
          .then(function() {
            alert("Fetching pending requests...");

            // Fetch pending requests
            firestore.collection("rZ89&*DE").doc(user.uid).collection("P").get()
              .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                  pendingList.push(doc.id);
                });
              })
              .then(function() {
                alert("Deleting user data...");

                // Delete user data
                firestore.collection("C99!2cz$").doc(user.uid).delete()
                  .then(function() {
                    alert("Deleting seenBy document...");

                    // Delete seenBy document
                    firestore.collection("S45!dc&*").doc(user.uid).collection("F").doc(user.uid).delete()
                      .then(function() {
                        alert("Deleting seenBy list...");

                        // Delete seenBy list
                        firestore.collection("S45!dc&*").doc(user.uid).collection("F").get()
                          .then(function(querySnapshot) {
                            var promises = [];
                            querySnapshot.forEach(function(doc) {
                              promises.push(doc.ref.delete());
                            });
                            return Promise.all(promises);
                          })
                          .then(function() {
                            alert("Deleting friend list...");

                            // Delete friend list
                            firestore.collection("f@*aDe12").doc(user.uid).collection("F").get()
                              .then(function(querySnapshot) {
                                var promises = [];
                                querySnapshot.forEach(function(doc) {
                                  promises.push(doc.ref.delete());
                                });
                                return Promise.all(promises);
                              })
                              .then(function() {
                                alert("Deleting friend requests...");

                                // Delete friend requests
                                firestore.collection("rZ89&*DE").doc(user.uid).collection("F").get()
                                  .then(function(querySnapshot) {
                                    var promises = [];
                                    querySnapshot.forEach(function(doc) {
                                      promises.push(doc.ref.delete());
                                    });
                                    return Promise.all(promises);
                                  })
                                  .then(function() {
                                    alert("Deleting pending requests...");

                                    // Delete pending requests
                                    firestore.collection("rZ89&*DE").doc(user.uid).collection("P").get()
                                      .then(function(querySnapshot) {
                                        var promises = [];
                                        querySnapshot.forEach(function(doc) {
                                          promises.push(doc.ref.delete());
                                        });
                                        return Promise.all(promises);
                                      })
                                      .then(function() {
                                        alert("Deleting user document and username...");

                                        // Delete user document and username
                                        firestore.collection("U34dlo@%").doc(user.uid).get()
                                          .then(function(doc) {
                                            if (doc.exists) {
                                              var username = doc.data().u;

                                              firestore.collection("Us789!z#").doc(username).delete()
                                                .then(function() {
                                                  firestore.collection("U34dlo@%").doc(user.uid).delete()
                                                    .then(function() {
                                                      alert("Deleting user storage...");

                                                      // Delete user storage
                                                      var storageRef = storage.ref("c7689/" + user.uid + "/c");
                                                      storageRef.delete()
                                                        .then(function() {
                                                          alert("Deleting friends' storage...");

                                                          // Delete friends' storage
                                                          var promises = [];
                                                          followingList.forEach(function(friendId) {
                                                            var friendStorageRef = storage.ref("c7689/" + friendId + "/c");
                                                            promises.push(friendStorageRef.delete());
                                                          });
                                                          return Promise.all(promises);
                                                        })
                                                        .then(function() {
                                                          alert("Deleting profile storage...");

                                                          // Delete profile storage
                                                          var profileStorageRef = storage.ref("u43a2/" + user.uid + "/c7689");
                                                          profileStorageRef.delete()
                                                            .then(function() {
                                                              alert("Deleting user account...");

                                                              // Delete user account
                                                              user.delete()
                                                                .then(function() {
                                                                  finishAccountDeletion();
                                                                })
                                                                .catch(function(error) {
                                                                  console.error("Error deleting user account:", error);
                                                                });
                                                            })
                                                            .catch(function(error) {
                                                              console.error("Error deleting profile storage:", error);
                                                            });
                                                        })
                                                        .catch(function(error) {
                                                          console.error("Error deleting friends' storage:", error);
                                                        });
                                                    })
                                                    .catch(function(error) {
                                                      console.error("Error deleting user document:", error);
                                                    });
                                                })
                                                .catch(function(error) {
                                                  console.error("Error deleting username:", error);
                                                });
                                            } else {
                                              finishAccountDeletion();
                                            }
                                          })
                                          .catch(function(error) {
                                            console.error("Error fetching user document:", error);
                                          });
                                      })
                                      .catch(function(error) {
                                        console.error("Error deleting pending requests:", error);
                                      });
                                  })
                                  .catch(function(error) {
                                    console.error("Error deleting friend requests:", error);
                                  });
                              })
                              .catch(function(error) {
                                console.error("Error deleting friend list:", error);
                              });
                          })
                          .catch(function(error) {
                            console.error("Error deleting seenBy list:", error);
                          });
                      })
                      .catch(function(error) {
                        console.error("Error deleting seenBy document:", error);
                      });
                  })
                  .catch(function(error) {
                    console.error("Error deleting user data:", error);
                  });
              })
              .catch(function(error) {
                console.error("Error fetching pending requests:", error);
              });
          })
          .catch(function(error) {
            console.error("Error fetching friend requests:", error);
          });
      })
      .catch(function(error) {
        console.error("Error fetching following list:", error);
      });
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


