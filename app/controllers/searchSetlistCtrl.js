"use strict";

// controller to search the specific show by date
angular.module("theNumberLine").controller("searchSetlistCtrl", function ($scope, setlistFactory, FbFactory) {

    // function that calls factory and gets shows by date(YYY-MM-DD)
    $scope.searchByDate = () => {
        setlistFactory.getShowDataByDate($scope.searchForShowByDate)
            .then((shows) => {
                console.log('shows', shows.data);
                $scope.songs = shows.data.data.tracks;
                $scope.venue = shows.data.data.venue;
                
                $scope.mustShowButton = true;
                $scope.showObject = {
                    showId: shows.data.data.id,
                    userId: firebase.auth().currentUser.uid
                };
            });
    };

    // function that pass the user id to the firbase factory to save, passes show id to firebase to store for user
    $scope.addSeenShow = () => {
        FbFactory.addShow($scope.showObject);
    };
});

