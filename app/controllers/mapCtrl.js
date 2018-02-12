"use strict";

angular.module("theNumberLine").controller("mapCtrl", function ($scope, FBCreds, NgMap) {
    // var vm = this;
    NgMap.getMap().then(function (map) {
        $scope.showCustomMarker = function (evt) {
            map.customMarkers.foo.setVisible(true);
            map.customMarkers.foo.setPosition(this.getPosition());
        };
        $scope.closeCustomMarker = function (evt) {
            this.style.display = 'none';
        };
    });
});