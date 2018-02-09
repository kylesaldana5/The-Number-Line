'use strict';

angular.module('theNumberLine')

    .directive('navBar', function () {
        return {
            restrict: 'E',
            templateUrl: 'partials/navBar.html',
            controller: 'navBarCtrl'
        };
    });