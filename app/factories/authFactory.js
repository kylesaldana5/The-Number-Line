"use strict";

angular.module("theNumberLine").factory("authFactory", (FBCreds, $q) =>{
    let currentUser = null;
    const provider = new firebase.auth.GoogleAuthProvider();

    // google login in function 
    let googleLogin = () => {
        return firebase
            .auth()
            .signInWithPopup(provider);
    };

    // google logout function 
    let googleLogout = () => {
        return firebase.auth().signOut();
    };

    // gives user and id and makes sure they are logged in 
    function isLoggedIn() {
        return $q((resolve, reject) => {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    currentUser = user.uid;
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }

    function getCurrentUser() {
        return currentUser;
    }

    return { googleLogin, googleLogout, isLoggedIn, getCurrentUser};
});