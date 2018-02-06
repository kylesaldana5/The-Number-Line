"use strict";

angular.module("theNumberLine", ["ngRoute"])
    .constant("FBUrl", "https://the-number-line.firebaseio.com")
    .config($routeProvider => {
        $routeProvider
            .when('/login', {
                templateUrl: "partials/login.html",
                controller: "loginCtrl"
            });
    });
