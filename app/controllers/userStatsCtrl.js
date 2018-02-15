"use strict";

// controller to display users stats 
angular.module("theNumberLine").controller("userStatsCtrl", function ($scope, setlistFactory, trackFactory, FbFactory, $location, $routeParams) {

    // gets users sorted shows from track factory
    $scope.sortedUserShows = trackFactory.track;
    console.log('stats users show', $scope.sortedUserShows );
    
    // keeps the user logged in so the data isnt lost when the page is refreshed
    firebase.auth().onAuthStateChanged((user) => {
        
    });





});
