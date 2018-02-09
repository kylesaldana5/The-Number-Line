"use strict";

angular.module("theNumberLine").controller("navBarCtrl", function ($scope, $location, $window, authFactory) {

    $scope.isActive = function (path) {

        var currentPath = $location.path().split('/')[1];

        if (currentPath.indexOf('?') !== -1)

            currentPath = currentPath.split('?')[0];

        return currentPath === path.split('/')[1];

    };

});



