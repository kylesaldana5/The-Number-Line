"use strict";

// function to verify are logged if not they cannot route to other pages
let isIn = (authFactory, $location) => {
    new Promise((resolve, reject) => {
        authFactory.isLoggedIn().then(bool => {
            console.log("user???", bool);
            if (bool) {
                console.log("Logged in . Go ahead");
                resolve();
            } else {
                console.log("Not Logged IN . Go away");
                $location.path("/login");
                
                reject();
            }
        });
    });
};

// routing for the app 
angular.module("theNumberLine", ["ngRoute", "chart.js", 'ngMap'])
    .constant("FBUrl", "https://the-number-line.firebaseio.com")
    .config($routeProvider => {
        $routeProvider
            .when('/login', {
                templateUrl: "partials/login.html",
                controller: "loginCtrl"
            })
            .when('/setlists', {
                templateUrl: "partials/searchSetlist.html",
                controller: "searchSetlistCtrl",
                resolve: {isIn}
            })
            .when('/setlists/:yearValue', {
                templateUrl: 'partials/setlistsByYear.html',
                controller: 'setlistsByYearCtrl',
                resolve: { isIn }
            })
            .when('/user', {
                templateUrl: 'partials/userShows.html',
                controller: 'userShowsCtrl',
                resolve: { isIn }
            })
            .when('/dates', {
                templateUrl: 'partials/dates.html',
                controller: 'datesCtrl',
                resolve: { isIn }
            })
            .when('/songs', {
                templateUrl: 'partials/songs.html',
                controller: 'songsCtrl',
                resolve: { isIn }
            })
            .when('/map', {
                templateUrl: 'partials/map.html',
                controller: 'mapCtrl',
                resolve: { isIn }
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