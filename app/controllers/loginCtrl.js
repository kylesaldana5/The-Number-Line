"use strict";

angular.module("theNumberLine").controller("loginCtrl", function ($scope, $window, authFactory) {
    
    // function that fires of google login 
    $scope.login = () =>{
        authFactory.googleLogin()
            .then((user) => {
            // will need to use $window or / $location here to derict after they log in
            });
    };

    // function that fires of googlelogout
    $scope.logout = () => {
        authFactory.googleLogout()
            .then((user) => {
                console.log('User Logged out', user);
                // will need to use $window or / $location here to derict after they log in
            });
    };
});