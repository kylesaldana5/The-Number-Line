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

    // function that call factory and gets shows by Era
    $scope.searchByEra = () => {
        setlistFactory.getEraData($scope.searchForShowByEra)
            .then((shows) => {
                $scope.eraDates = shows.data.data;
            });
    };

    //  function that call factory to get shows by Year
    $scope.searchShowsByYear = () =>{
        // figure out why it isnt getting the value of the years eraDates ?
        console.log('what is this', $scope.searchForShowsByYears);
        setlistFactory.getShowByYear($scope.searchForShowsByYears)
            .then((shows) =>{
                console.log('shows year', shows );
            });
    };
        
                

    // function that pass the user id to the firbase factory to save, passes show id to firebase to store for user
    $scope.addSeenShow = () => {
        FbFactory.addShow($scope.showObject);
    };
});


