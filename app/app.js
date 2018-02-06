"use strict";

// function to verify are logged if not they cannot route to other pages
let isIn = (authFactory) => {
    new Promise((resolve, reject) => {
        authFactory.isLoggedIn().then(bool => {
            console.log("user???", bool);
            if (bool) {
                console.log("Logged in . Go ahead");
                resolve();
            } else {
                console.log("Not Logged IN . Go away");
                reject();
            }
        });
    });
};

// routing for the app 
angular.module("theNumberLine", ["ngRoute"])
    .constant("FBUrl", "https://the-number-line.firebaseio.com")
    .config($routeProvider => {
        $routeProvider
            .when('/login', {
                templateUrl: "partials/login.html",
                controller: "loginCtrl"
            })
            .when('/setlists', {
                templateUrl: "partials/searchSetlist.html",
                controller: "searchSetlistCtrl"
            })
            .otherwise("/login");
    })

    // method getting creds from firebase values 
    .run(FBCreds => {
    let creds = FBCreds;
    let authConfig = {
        apiKey: creds.apiKey,
        authDomain: creds.authDomain
    };
    firebase.initializeApp(authConfig);
}); 