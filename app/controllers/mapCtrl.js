"use strict";

angular.module("theNumberLine").controller("mapCtrl", function ($scope, FbFactory, NgMap, $window) {
    
    $scope.limit = 0;
    $scope.noLatLongArr = [];
    $scope.latLongArr = [];

    // method to get information from firebase then sort through to get info for pins
    let userPins = () => {
        FbFactory.getUserShows()
            .then((data) => {
                $scope.shows = Object.values(data);
                getLatLong();
                console.log('no lat ', $scope.noLatLongArr );
                console.log('lat ', $scope.latLongArr);
                
                
            })
            .catch((err)=>{
                console.log('error',err );
            });
    };

    // method to get lat and long for map 
    function getLatLong() {
        $scope.shows.forEach(show => {
            if (show.lat) {
                $scope.latLongArr.push(show);
            }
            else $scope.noLatLongArr.push(show);
        });
    }
    
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
    })
    .catch((err) =>{
        console.log('err',err );
        
    });
});