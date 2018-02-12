"use strict";

angular.module("theNumberLine").controller("mapCtrl", function ($scope, FbFactory, NgMap) {

    // method to get information from firebase then sort through to get info for pins
    let userPins = () => {
        FbFactory.getUserShows()
            .then((data) => {
                $scope.shows = Object.values(data);
            });
    };


    // keeps the user logged in so the data isnt lost when the page is refreshed
    firebase.auth().onAuthStateChanged((user) => {
        userPins();
    });


    // methods for google maps
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