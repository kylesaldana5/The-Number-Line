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
            console.log('scope shows',$scope.shows );
            
            getLatLong();   
        })
        .catch((err)=>{
            console.log('error',err );
        });
    };
    
    // keeps the user logged in so the data isnt lost when the page is refreshed
    firebase.auth().onAuthStateChanged((user) => {
        userPins();
        $scope.userNotes();
    });

    // method to get lat and long for map 
    function getLatLong() {
        $scope.shows.forEach(show => {
            if (show.lat) {
                $scope.latLongArr.push(show);
            }
            else $scope.noLatLongArr.push(show);
        });
    }
    
    
    
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
    
    // method for getting users notes to display when a pin is clicked 
    $scope.userNotes = () => {
        FbFactory.getUserNotes()
        .then((data) => {
            $scope.notes = Object.values(data);
            console.log('data',$scope.notes );
            
        });
    };

    // function that compares if the clicked pins show is the same as the note and displays them on the DOM
    $scope.showNote = (event, showId) => {
        $scope.selectedShow = showId;
        console.log('selected show', $scope.selectedShow );
        
    };
    
});