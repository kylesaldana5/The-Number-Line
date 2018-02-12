"use strict";

angular.module("theNumberLine").controller("navBarCtrl", function ($scope, $location, $window, authFactory) {

    $scope.isActive = function (path) {

        var currentPath = $location.path().split('/')[1];

        if (currentPath.indexOf('?') !== -1)

            currentPath = currentPath.split('?')[0];

        return currentPath === path.split('/')[1];

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



